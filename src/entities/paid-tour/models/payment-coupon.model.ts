import {PaymentModel} from "@/bokun-widget/src/models/steps/payment.model";
import {BokunCartModel} from "@/bokun-widget/src/models/steps/second/bokun-cart.model";

export class PaymentCouponModel  extends  PaymentModel{
    constructor(readonly cartModel: BokunCartModel) {
        super(cartModel);
    }
}