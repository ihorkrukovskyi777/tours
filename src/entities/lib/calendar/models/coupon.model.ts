import {makeAutoObservable, runInAction} from "mobx";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
import {AdditionalOrderSingle} from "@entities/lib/calendar/models/single/additional-order.single";
import {CouponCodeSingle, ICoupon} from "@entities/lib/calendar/models/single/coupon-code.single";
import {CardExperience} from "@entities/paid-tour/@types";

interface IText {
    locale: string
    text: string
}


interface Coupon {
    active: boolean
    code: string
    coupon: string
    id: number
    time_to_finish: number
    type: string
    value: number
    json: {
        congratulation: {
            buttonsCancel: IText,
            callToActions: IText,
            descriptions: IText,
            titles: IText,
            linkAllPage: IText,
        }
        offer: {
            buttonsCancel: IText,
            callToActions: IText,
            descriptions: IText,
            titles: IText,
        }
    }
}

interface CouponData {
    active: boolean
    id: number
    type: string
    value: number
}

interface City {
    title: string
    slug: string
    id: number
}

export class CouponModel {
    offerModal = {
        buttonsCancel: {locale: 'en', text: ''},
        callToActions: {locale: 'en', text: ''},
        descriptions: {locale: 'en', text: ''},
        titles: {locale: 'en', text: ''},
    }
    congratulationModal = {
        buttonsCancel: {locale: 'en', text: ''},
        callToActions: {locale: 'en', text: ''},
        descriptions: {locale: 'en', text: ''},
        titles: {locale: 'en', text: ''},
        linkAllPage: {locale: 'en', text: ''},
        hint: {locale: 'en', text: ''},
    }

    coupon: CouponData | null = null
    tours: any[] = [];

    city: City | null = null;
    emailHasSent = false;
    couponForBooking: { id: number, code: string, time_to_finished: number } | null = null
    additionalOrder = new AdditionalOrderSingle();


    private _historyState: any = null;
    readonly option?: ProcessOptionModel

    constructor(option?: ProcessOptionModel) {
        this.option = option;
        makeAutoObservable<this, '_historyState'>(this, {_historyState: false}, {autoBind: true})
    }

    setOrderLink(order: string) {
        this.additionalOrder.set(order)
    }

    removeOrder() {
        this.additionalOrder.remove()
    }

    get additionalOrderId(): string | null {
        return this.additionalOrder.id
    }

    get historyState() {
        return this._historyState ?? null
    }

    get isEmpty() {
        return (this.tours.length === 0 || this.coupon === null)
    }

    async fetchCreateCoupon(booking_id: number | string) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    booking_id: booking_id
                }),
                next: {
                    revalidate: 0
                }
            })
            if (!response.ok)
                throw new NotFoundException()

            const data = await response.json() as ICoupon
            this.setCouponForBooking(data);

            new CouponCodeSingle().set(data)
            return data.id
        } catch (err) {
            throw err;
            console.log(err)
        }
    }

    private setCouponForBooking(data: any) {
        this.couponForBooking = {
            id: data.id,
            code: data.code,
            time_to_finished: data.time_to_finished,
        }

        if (this._historyState) {
            this._historyState = {
                ...this._historyState,
                couponForBooking: {
                    id: data.id,
                    code: data.code,
                    time_to_finished: data.time_to_finished,
                },
                emailHasSent: this.emailHasSent
            }
        }
    }

    async fetchDecline() {
        if (this.couponForBooking) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/decline/${this.couponForBooking.id}`, {
                method: 'DELETE',
                next: {
                    revalidate: 0
                }
            })

            if (!response.ok)
                throw new NotFoundException()
        }
    }

    async fetchPaidModal(tour_id: number) {
        if (this.option) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/paid-tours-search/by-free/${tour_id}?locale=${this.option.page.locale}&dep_locale=${this.option.locale}`, {
                    next: {
                        revalidate: 0
                    }
                })
                const data = await response.json() as { coupon: Coupon, tours: CardExperience[], city: City };
                this.setData(data);
            } catch (err) {
                this.coupon = null;
            }
        }
    }

    private setData(data: any) {
        runInAction(() => {
            this.offerModal = data.coupon.json.offer
            this.congratulationModal = data.coupon.json.congratulation
            this.tours = data.tours
            this.city = data.city
            this.coupon = {
                id: data.coupon.id,
                type: data.coupon.type,
                value: data.coupon.value,
                active: data.coupon.active
            }


           try {
               this._historyState = {data: data, couponForBooking: this.couponForBooking, emailHasSent: this.emailHasSent};
           } catch (err) {
               console.log(err)
           }
        })
    }

    restoreFromState(data: any) {
        if(data?.emailHasSent)
            this.emailHasSent = true;

        if (data?.data)
            this.setData(data.data)

        if (data?.couponForBooking)
            this.setCouponForBooking(data.couponForBooking)

    }

    async sendEmail() {
        if (this.couponForBooking && this.option) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/send-email/${this.couponForBooking.id}?locale=${this.option.page.locale}`, {
                method: 'GET',
                next: {
                    revalidate: 0
                }
            })

            if (!response.ok)
                throw new NotFoundException()


            if(this._historyState) {
                this._historyState = { ...this._historyState, emailHasSent: true }
            }

        }
    }
}