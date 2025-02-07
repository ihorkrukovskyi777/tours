import {makeAutoObservable, runInAction} from "mobx";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";

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
    }

    coupon: CouponData | null = null
    tours: any[] = [];

    city: City | null = null;

    couponForBooking: number | null = null

    constructor(readonly option: ProcessOptionModel,) {
        makeAutoObservable(this, {}, {autoBind: true})
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

            const data = await response.json()
            this.couponForBooking = data.id
            return data.id
        } catch (err) {
            console.log(err)
        }
    }

    async fetchDecline() {
        if (this.couponForBooking) {
            await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/decline/${this.couponForBooking}`, {
                method: 'DELETE',
                next: {
                    revalidate: 0
                }
            })
        }
    }

    async fetchPaidModal(tour_id: number) {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/tours/${tour_id}?locale=${this.option.page.locale}`, {
                next: {
                    revalidate: 0
                }
            })
            const data = await response.json() as { coupon: Coupon, tours: any[], city: City };
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
            })
        } catch (err) {
            this.coupon = null;
        }
    }
}