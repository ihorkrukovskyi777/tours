// @ts-nocheck
import {makeAutoObservable, runInAction} from "mobx"
import TourLogic from "@entities/calendar/service/tour-logic";
import {isTomorrowOrToday} from "@shared/helpers/date";
import {DepLocales} from "@entities/lib/calendar/@types/locales";
import {DepartureByDayModel} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {CalendarModel} from "@entities/lib/calendar/models/departures/calendar.model";


export class DeparturesModel {
    departureIterable: null | Generator
    offset: number
    done: boolean
    isEmpty: boolean
    activeLanguage: DepLocales[]
    timezone: string
    locale: string
    service: TourLogic
    _allDepartures: any[]
    calendar: CalendarModel
    listByDays: DepartureByDayModel
    option: ProcessOptionModel

    constructor(option: ProcessOptionModel) {
        this._allDepartures = [];
        this.departureIterable = null;
        this.offset = 0;
        this.done = false;
        this.option = option
        this.isEmpty = true;
        this.activeLanguage = [];
        this.timezone = 'UTC';
        this.calendar = new CalendarModel(this);
        this.listByDays = new DepartureByDayModel(this);
        this.service = new TourLogic(option.page.id, option.locale, option.locale, option.page.type, option.peopleNumber);
        makeAutoObservable(this, {}, {autoBind: true, deep: false});
    }

    get isNextPage() {
        return this._allDepartures.length > this.departures.length
    }


    private get people() {
        return this.option.peopleNumber
    }

    private get locale() {
        return this.option.locale
    }

    getToursByDay(date) {

        const values = this.service.getToursByDay(date);

        for (const key in values) {

            // @ts-ignore
            values[key] = values[key].map(dep => {
                const subVendor = this.getSubVendor(dep.subVendorId)


                return {
                    ...dep,
                    tourTitle: this.getTourTitle(dep.tourId),
                    avatar: subVendor.avatar,
                    subVendorName: subVendor.name,
                    ranking: subVendor.rating,
                }
            })
        }
        return values
    }

    getTourByMonthAndYear(month, year) {
        return this.service.getTourByMonthAndYear(month, year);
    }

    async changeLocale() {
        this.service.updateCurrentLang(this.option.locale);
        this.service.updatePeopleNumber(1)
        await this.fetchDepartures();
    }

    initPagination() {
        this.done = false;
        this.offset = 0;
        this._allDepartures = [];
        this.departureIterable = this.service.getDataMonth();
        this.nextPage();
        this.calendar.updateDepartures()
    }

    setPeople() {
        this.service.updatePeopleNumber(this.people);
    }

    changePeople() {
        this.setPeople()
        this.initPagination();
        this.calendar.updateDepartures()
    }

    async fetchDepartures() {
        await this.service.getData((timezone) => {
            this.timezone = timezone;
        });

        runInAction(() => {
            this.isEmpty = !Object.keys(this.service.data[this.locale].deps).length
            this.initPagination();
        })
    }

    setDepartures(data: any) {
        this.service.setDepartures(data)

        this.isEmpty = !Object.keys(this.service.data[this.locale].deps).length
        this.initPagination()
    }

    getNamesDays() {
        return this.service.getDaysNameByLocale(this.locale)
    }

    getDaysNameByLocaleAndDate(day) {
        return this.service.getDaysNameByLocaleAndDate(this.locale, day);
    }

    get departures() {
        return this._allDepartures.slice(0, this.offset);
    }

    getSubVendor(id) {
        return this.service?.data[this.locale]?.subVendor[id] ?? {};
    }

    getTourTitle(id) {
        return this.service?.data[this.locale]?.tours[id] ?? '';
    }

    nextPage() {
        if (this.offset + 20 < this._allDepartures.length && this.offset > 0 || this.done) {
            this.offset = this.offset + 10;
        } else {
            const results = [];
            while (true) {
                const data = this.departureIterable.next()
                this.done = data.done;

                results.push(...Object.values(data.value).flat())
                if (data.done || results.length > 30) {
                    break;
                }
            }
            const additionalField = results.map(item => {
                const subVendor = this.getSubVendor(item.subVendorId)
                return {
                    ...item,
                    tourTitle: this.getTourTitle(item.tourId),
                    avatar: subVendor.avatar,
                    subVendorName: subVendor.name,
                    ranking: subVendor.rating,
                    fullTime: item.fullTime ?? null
                }
            })
            this._allDepartures = [...this._allDepartures, ...additionalField];

            let spliceIndex = 10;
            if (this.departures.length === 0) {
                const findIndex = this._allDepartures.findIndex(item => {
                    if (isTomorrowOrToday(item.date, 0)) {
                        return false
                    } else if (isTomorrowOrToday(item.date, 1)) {
                        return false;
                    }
                    return true;
                })
                spliceIndex = findIndex < 5 ? 5 : findIndex;
                spliceIndex = spliceIndex > 30 ? 30 : spliceIndex;
            }
            this.offset = this.offset + spliceIndex;
        }


    }
}
