'use client'
import {CSSProperties, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {CouponCodeSingle} from "@entities/lib/calendar/models/single/coupon-code.single";
import Congratulations from "@/widgets/congratulations";
import CongratulationCard from "@shared/ui/card-components/congratulation-card/congratulation-card";
import {getHrefLocale} from "@i18n/get-href-locale";
import {PATH_TOURS} from "@shared/constants/route";
import {DataPagePaidTours} from "@/app/[locale]/[slug]/paid-tours/page";
import {useTranslations} from "next-intl";
import SpinnerCircle from "@/bokun-widget/src/ui/spinner/spinner-circle";
import {NotFoundException} from "@/bokun-widget/src/api/exception";

interface Coupon {
    code: string
    time_to_finished: number
    type: "amount" | 'percentage'
    value: number
}



interface Props {
    data: DataPagePaidTours
    title: string
}

const CouponViews = ({data, title}: Props) => {
    const search = useSearchParams()

    const [isLoading, setLoading] = useState(true)
    const [coupon, setCoupon] = useState<Coupon | null>(null)
    useEffect(() => {
        const queryCode = search.get('code')
        const localeCoupon = new CouponCodeSingle().coupon

        const code = queryCode ?? localeCoupon?.code

        if (!code) {
            setLoading(false)
            return;
        }


        setLoading(true);
        new CouponCodeSingle().fetchCoupon(code).then(res => res.json()).then(coupon => {
            if (coupon) {
                new CouponCodeSingle().set(coupon)
                setCoupon(coupon)
            }

        }).catch((err) => {
            if(err instanceof NotFoundException) {
                setCoupon(null)
            }
        }).finally(() => {

            setLoading(false)
        })
    }, [])

    const styles: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 55,
        justifyContent: 'center',
        background: 'rgba(255,255,255, 1)'
    }

    const typeSale = coupon?.type === 'percentage' ? '%' : ' USD'
    const couponValue = coupon ? `-${coupon?.value}${typeSale}` : undefined


    return (
        <div className="container congratulations_page">
            {isLoading &&
                <div style={styles}>
                    <SpinnerCircle isLoading={true}/>
                </div>
            }
            <div className="content">
                <Congratulations
                    title={title}
                    subTitle={''}
                >
                    {data.tours.map(tour => {
                        return (
                            <CongratulationCard
                                url={getHrefLocale(tour.locale, `${tour.city?.slug}/${PATH_TOURS}/${tour.slug}`)}
                                key={tour.id}
                                title={tour.title}
                                sale={coupon ? couponValue : undefined}
                                attachment={tour.image}
                            >

                            </CongratulationCard>
                        )
                    })}
                </Congratulations>
            </div>
        </div>
    )
}

export default CouponViews