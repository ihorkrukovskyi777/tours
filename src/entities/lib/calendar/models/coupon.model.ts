import {makeAutoObservable, runInAction, toJS} from "mobx";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
import {AdditionalOrderSingle} from "@entities/lib/calendar/models/single/additional-order.single";
import {CouponCodeSingle, ICoupon} from "@entities/lib/calendar/models/single/coupon-code.single";
import {CardExperience, Iimage} from "@entities/paid-tour/@types";

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

    couponForBooking: { id: number, code: string, time_to_finished: number} | null = null
    additionalOrder = new AdditionalOrderSingle();

    constructor(readonly option: ProcessOptionModel,) {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setOrderLink(order: string) {
        this.additionalOrder.set(order)
    }

    get additionalOrderId(): string | null {
        return this.additionalOrder.id
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
            if(!response.ok)
                throw new NotFoundException()

            const data = await response.json() as ICoupon
            this.couponForBooking = {
                id: data.id,
                code: data.code,
                time_to_finished: data.time_to_finished,
            }

            new CouponCodeSingle().set(data)
            return data.id
        } catch (err) {
            console.log(err)
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

            if(!response.ok)
                throw new NotFoundException()
        }
    }

    async fetchPaidModal(tour_id: number) {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/paid-tours-search/by-free/${tour_id}?locale=${this.option.page.locale}&dep_locale=${this.option.locale}`, {
                next: {
                    revalidate: 0
                }
            })
            const data = await response.json() as { coupon: Coupon, tours: CardExperience[], city: City };
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

    async sendEmail() {
        if (this.couponForBooking) {
           const response =  await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/send-email/${this.couponForBooking.id}?locale=${this.option.page.locale}`, {
                method: 'GET',
                next: {
                    revalidate: 0
                }
            })

            if(!response.ok)
                throw new NotFoundException()

        }
    }
}