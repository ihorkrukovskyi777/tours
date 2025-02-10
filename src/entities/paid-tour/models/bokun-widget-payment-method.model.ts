import {PaymentModel} from "@/bokun-widget/src/models/steps/payment.model";
import {BokunCartModel} from "@/bokun-widget/src/models/steps/second/bokun-cart.model";
import {AdditionalOrderSingle} from "@entities/lib/calendar/models/single/additional-order.single";
export class BokunWidgetPaymentMethodModel extends  PaymentModel{
    constructor(readonly cartModel: BokunCartModel) {
        super(cartModel);
    }

    successUrl() {
        const order = new AdditionalOrderSingle();
        if(order.id) {
            const slug = this.cartModel.locale === 'en' ? 'booking-confirmation' : `${this.cartModel.locale}/booking-confirmation`
            return `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${slug}/${order.id}`

        }
        return super.successUrl()
    }

    returnUrl() {
        const order = new AdditionalOrderSingle();
        if(order.id) {
            return `${super.returnUrl()}&additional_order=${order.id}`
        }

        return super.returnUrl()
    }
}