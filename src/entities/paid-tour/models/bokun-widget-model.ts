import {makeAutoObservable, runInAction} from "mobx";
import dayjs from "dayjs";
import {ReferralTraffic} from "@/bokun-widget/src/entity/users-traffic-store";
import {BokunChoiceAnOrderModel, Loader} from "@/bokun-widget/src/bokun-choice-an-order.model";
import {FetchBokunIntegration} from "@/bokun-widget/src/api/fetch-bokun-integration";
import {RateEntity} from "@/bokun-widget/src/entity/rate.entity";
import {ModelImpl} from "@shared/hooks/use-client-model";
import {Upcoming} from "@entities/paid-tour/views/pick-a-date.view";
import {CouponCodeSingle} from "@entities/lib/calendar/models/single/coupon-code.single";
import {BokunWidgetPaymentMethodModel} from "@entities/paid-tour/models/bokun-widget-payment-method.model";
const getCoupon = () : {  code: string  } | undefined  => {
    const coupon = new CouponCodeSingle();
    if(coupon.coupon?.code) {
        return { code: coupon.coupon.code}
    }
    return undefined
}

export class BokunWidgetModel implements ModelImpl {
    fetch: FetchBokunIntegration;

    choice_an_order: BokunChoiceAnOrderModel;

    is_open_modal = false
    loader = new Loader(true)

    constructor(locale: string, bokun_id: number) {
        this.choice_an_order = new BokunChoiceAnOrderModel(
            bokun_id,
            locale,
            this.loader,
            {
                referral_site: process.env.NEXT_PUBLIC_CANONICAL_DOMAIN as string,
                locale,
                review: new ReferralTraffic()
            },
            (model) => new BokunWidgetPaymentMethodModel(model),
            getCoupon()
        )

        this.fetch = new FetchBokunIntegration(locale);
        makeAutoObservable(this, {}, {autoBind: true, deep: true})
    }

    get price(): number | null {
        return this.choice_an_order.store?.nextDefaultPriceMoney?.amount ?? null
    }

    get perLabel() {
        return this.choice_an_order.store?.bokun?.activity?.pricingCategories?.find(item => item.defaultCategory)?.title ?? null
    }

    async toggleModal() {
        if (!this.choice_an_order.cart?.paymentModel?.isProcessBooking) {
            this.is_open_modal = !this.is_open_modal
            if (this.choice_an_order.cart?.paymentModel && this.choice_an_order.cart?.currentStep?.step === 2) {
                await this.choice_an_order.cart?.returnToCart();
                this.choice_an_order.cart.setStepByIndex(1);
                return
            }
        }
    }

    get firstDepartures(): Upcoming[] {
        const dates: { [key in string]: RateEntity } = {}


        for (const rate of this.choice_an_order.store?.rates) {

            if (!dates[rate.dep.date])
                dates[rate.dep.date] = rate;

            if (Object.values(dates).length === 3) {
                break
            }
        }

        return Object.values(dates).map(rate => {
            return {
                id: rate.dep.id,
                date: {
                    fullDate: dayjs(rate.dep.date).format('DD/MM/YY'),
                    dayWeek: dayjs(rate.dep.date).format('dddd'),
                    dayNumber: dayjs(rate.dep.date).format('DD'),
                    month: dayjs(rate.dep.date).format('MMMM'),
                    time: rate.dep.startTime ?? ''
                }
            }
        })
    }

    async onPickFullDate(fullDate: string) {
        await this.toggleModal()
        this.choice_an_order.calendar.setSelectData(fullDate)
    }

    dispose(): void {
    }

    async init() {
        this.loader.on()
        await this.choice_an_order.init()
        runInAction(() => {
            this.loader.off()
        })
    }
}