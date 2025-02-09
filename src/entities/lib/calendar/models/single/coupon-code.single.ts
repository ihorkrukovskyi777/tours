import localstorageTtl from "@shared/helpers/localstorage-ttl";

export interface ICoupon { id: number, code: string, time_to_finished: number}
export class CouponCodeSingle {

    constructor(){
    }

    set(coupon: ICoupon) {
        localstorageTtl.set('coupon', coupon, coupon.time_to_finished - (1000 * 60))
    }

    get coupon(): ICoupon | null {
       try {
           return localstorageTtl.get('coupon')

       } catch (err) {
           return null
       }
    }
}