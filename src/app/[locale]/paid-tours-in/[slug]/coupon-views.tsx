'use client'
import {CSSProperties, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {CouponCodeSingle} from "@entities/lib/calendar/models/single/coupon-code.single";
import Congratulations from "@/widgets/congratulations";
import CongratulationCard from "@shared/ui/card-components/congratulation-card/congratulation-card";
import {getHrefLocale} from "@i18n/get-href-locale";
import {PATH_TOURS} from "@shared/constants/route";
import {DataPagePaidTours} from "@/app/[locale]/paid-tours-in/[slug]/page";
import {useTranslations} from "next-intl";
import SpinnerCircle from "@/bokun-widget/src/ui/spinner/spinner-circle";

interface Coupon {
    code: string
    time_to_finished: number
    type: "amount" | 'percentage'
    value: number
}

async function fetchCoupon(code: string) {

    return fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/bokun/coupon/by-code/${code}`, {
        next: {
            revalidate: 0
        }
    })
}

interface Props {
    data: DataPagePaidTours
}

const CouponViews = ({data}: Props) => {
    const t = useTranslations()
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
        fetchCoupon(code).then(res => res.json()).then(coupon => {
            if (coupon) {
                new CouponCodeSingle().set(coupon)
                setCoupon(coupon)
            }

        }).catch().finally(() => {

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

    const typeSale = coupon?.type === 'percentage' ? '%' : 'USD'
    const couponValue = coupon ? `- ${coupon?.value}${typeSale} ${t('off!')}` : undefined


    return (
        <div className="container congratulations_page">
            {isLoading &&
                <div style={styles}>
                    <SpinnerCircle isLoading={true}/>
                </div>
            }
            <div className="content">
                <Congratulations
                    title={t('Paid Tours in {city}', {city: data.city.title})}
                    subTitle={''}
                >
                    {data.tours.map(tour => {
                        return (
                            <CongratulationCard
                                url={getHrefLocale(tour.locale, `${tour.city?.slug}/${PATH_TOURS}/${tour.slug}`)}
                                key={tour.id}
                                title={tour.title}
                                sale={couponValue}
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