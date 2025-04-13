import {ModelImpl} from "@shared/hooks/use-client-model";
import {AnalyticsData, AnalyticsDataLeft, AnalyticsEvent} from "@entities/analytics/types";
import {serialize} from 'object-to-formdata';
import {Fetch} from "@entities/paid-tour/api/fetch";
import localstorageTtl from "@shared/helpers/localstorage-ttl";

const backupAnalytics = (): AnalyticsData[] => {
    try {
        const data = window.localStorage.getItem('analytics_events');
        if (data !== null) {
            return JSON.parse(data) as AnalyticsData[]
        }
    } catch (err) {
        return [];
    }
    return [];
}

class AnalyticsStorage {
    fetch = new Fetch()

    constructor() {
    }

    get session_id(): number | null {
        const id = window.sessionStorage.getItem('session_id')

        if (id === null) {
            return null;
        }

        return Number.isInteger(Number(id)) ? Number(id) : null
    }

    set session_id(val: number) {
        window.sessionStorage.setItem('session_id', String(val))
    }

    async resetSession() {
        window.sessionStorage.removeItem('session_id')
        await this.createUser();
    }

    get user_id(): number | null {
        const id = localstorageTtl.get('uid_user')
        if (id === null) {
            return null;
        }

        return Number.isInteger(Number(id)) ? Number(id) : null
    }

    set user_id(val: number) {
        localstorageTtl.set('uid_user', String(val), 15778800000)
    }

    async createUser() {
        if (this.session_id === null || this.user_id === null) {
            const data = await this.fetch.post('analytics/user', {
                user_id: this.user_id,
                session_id: this.session_id
            }) as { session_id: number, user_id: number }
            this.session_id = data.session_id
            this.user_id = data.user_id
        }

    }
}

export class AnalyticsModel implements ModelImpl {
    storage: AnalyticsStorage = new AnalyticsStorage();
    data: AnalyticsData[] = [];

    private leftThePageAfterRedirect: AnalyticsDataLeft[] = [];

    private enableSetTimeout = false;

    private wasEventThisSession = false;
    private wasLastEventsVisibilitychange = false
    constructor() {


    }

    async init() {
        this.enableSetTimeout = true;
        this.startSetTimeout();
        window.addEventListener('beforeunload', this.beforeunload);
        window.addEventListener('visibilitychange', this.visibilitychange);
        await this.storage.createUser();
        this.data = backupAnalytics();
    }

    get pathName() {
        return window.location.pathname
    }

    get allEvents() {
        return [...this.data, ...this.leftThePageAfterRedirect]
    }

    clearEventLeftPageAfterRedirect(pathname: string) {
        this.leftThePageAfterRedirect = this.leftThePageAfterRedirect.filter(item => item.redirect_pathname !== pathname)
    }

    addEventNoLastDuplicate(event: AnalyticsEvent) {
        const length = this.data.length
        if (this.data[length - 1]?.type !== event.type || this.pathName !== this.data[length - 1].pathname) {
            this.addEvent(event)
        }
    }

    addEventLeftPageAfterRedirect(event: AnalyticsEvent, pathname: string) {
        this.leftThePageAfterRedirect.push({
            type: event.type,
            created_at: new Date(),
            redirect_pathname: pathname,
            pathname: window.location.pathname,
            site: 'strawberrytours'
        })

    }

    addEvent(event: AnalyticsEvent) {
        if (!this.isCompareLastEvent(event, window.location.pathname)) {
            this.wasEventThisSession = true;
            this.data.push({
                type: event.type,
                created_at: new Date(),
                pathname: window.location.pathname,
                site: 'strawberrytours'
            })
            this.serialization();
            this.serializationLastEvent();
        }
    }

    async addEventAndResetSession(event: AnalyticsEvent) {
        this.addEvent(event)
        if (this.allEvents?.length) {
            await this.sendAnalytics(this.data);
            await this.storage.resetSession();
        }

    }

    private clearEvents() {
        this.data = [];
        this.serialization()
    }

    private isCompareLastEvent(event: AnalyticsEvent, pathname: string) {
        if (this.lastEvent !== null) {
            try {
                return this.lastEvent.type === event.type && this.lastEvent.pathname === pathname
            } catch (err) {
                console.log(err)
            }
        }
        return false;
    }

    private get lastEvent() : AnalyticsData | null {
        const event =  window.sessionStorage.getItem('last_event')

        if(event === null) {
            return null
        }
        try {
            return JSON.parse(event) as AnalyticsData;
        } catch (err) {
            return null
        }
    }

    private serialization() {
        const data = JSON.stringify(this.data);
        window.localStorage.setItem('analytics_events', data);
    }

    private serializationLastEvent() {
        const events = [...this.data, ...this.leftThePageAfterRedirect];

        if (events.length) {
            const event = events[events.length - 1];

            if(!['hidden_the_tab_browser', 'visible_the_tab_browser'].includes(event.type)) {
                this.wasLastEventsVisibilitychange = false;
            }
            const json = JSON.stringify(events[events.length - 1])
            window.sessionStorage.setItem('last_event', json)
        }
    }


    async sendAnalytics(analyticsData: AnalyticsData[]) {
        if (analyticsData.length && this.storage.session_id) {
            try {
                this.clearEvents();
                const events = analyticsData.map(item => ({
                    type: item.type,
                    created_at: item.created_at,
                    pathname: item.pathname,
                    site: item.site,
                    session_id: this.storage.session_id,
                }));
                const data = serialize({events}, {indices: true})
                navigator.sendBeacon(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/analytics`, data);

            } catch (err) {
                console.log(err)
            }
        }

        this.startSetTimeout()
    }

    beforeunload = async () => {
        await this.sendAnalytics([...this.data, ...this.leftThePageAfterRedirect])
    }

    private get lastEventShowModal() {
        if(this.lastEvent === null) {
            return false;
        }
        try {
            return ['show_additional_modal', 'show_coupon_modal'].includes(this.lastEvent.type)
        } catch (err) {
            return false
        }
    }

    private get lastEventHidden() {
        if(this.lastEvent === null) {
            return false;
        }
        try {
            return this.lastEvent.type === 'hidden_the_tab_browser'
        } catch (err) {
            return false
        }
    }
    visibilitychange =  async () => {
        if (this.lastEventShowModal && document.visibilityState === 'hidden' && this.wasEventThisSession && !this.wasLastEventsVisibilitychange) {
            this.addEventNoLastDuplicate({
                type: 'hidden_the_tab_browser'
            })
        } else if (this.lastEventHidden && document.visibilityState === 'visible' && this.wasEventThisSession && !this.wasLastEventsVisibilitychange) {
            this.addEventNoLastDuplicate({
                type: 'visible_the_tab_browser'
            })
            this.wasLastEventsVisibilitychange = true;
        }
        await this.sendAnalytics([...this.data, ...this.leftThePageAfterRedirect])
    }

    private startSetTimeout() {
        if (this.enableSetTimeout) {
            setTimeout(() => this.sendAnalytics(this.data), 10000)
        }
    }

    dispose(): void {
        this.enableSetTimeout = false
        window.removeEventListener('beforeunload', this.beforeunload)
        window.removeEventListener('visibilitychange', this.visibilitychange)
    }


}