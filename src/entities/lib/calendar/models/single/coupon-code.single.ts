import localstorageTtl from "@shared/helpers/localstorage-ttl";
import {NotFoundException} from "@/bokun-widget/src/api/exception";
export interface ICoupon { id: number, code: string, time_to_finished: number}
export class CouponCodeSingle {

    constructor(){
    }

    async revalidate() {

        try {
            if(this.coupon?.code) {
                await this.fetchCoupon(this.coupon.code)
            }
        } catch (err) {
            if(err instanceof NotFoundException) {
                this.remove()
            }
        }
    }
    set(coupon: ICoupon) {
        localstorageTtl.set('coupon', coupon, coupon.time_to_finished - (1000 * 60))
    }

    remove() {
        localstorageTtl.remove('coupon')
    }
    get coupon(): ICoupon | null {
       try {
           return localstorageTtl.get('coupon')

       } catch (err) {
           return null
       }
    }

    async fetchCoupon(code: string) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/by-code/${code}`, {
                next: {
                    revalidate: 0
                }
            })

            if(!response.ok)
                throw new NotFoundException()

            return response
        } catch (err) {
            throw err
        }
    }
}