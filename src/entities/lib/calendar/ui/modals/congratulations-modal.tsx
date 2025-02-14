'use client'
import {observer} from "mobx-react-lite";
import BaseModal from "@entities/lib/calendar/ui/modals/base-modal/base-modal";
import {CouponModel} from "@entities/lib/calendar/models/coupon.model";
import CongratulationCard from "@shared/ui/card-components/congratulation-card/congratulation-card";
import Button from "@shared/ui/selectors/button/button";
import Link from "next/link";
import { PATH_TOURS} from "@shared/constants/route";
import {
    useCaseDeclineCouponForBooking,
    useCaseSendCouponEmail
} from "@entities/lib/calendar/usecases";
import {getHrefLocale} from "@i18n/get-href-locale";
import {PAID_TOUR_IN_CITY} from "@i18n/path-rewrites/paid-tour-in-city.mjs"
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import './base-modal/congratulations-model.scss'

interface Props {

    model: CouponModel
    isLoading: boolean
}

const CongratulationsModel = observer(({ model, isLoading}: Props) => {
    const i18n = useContextProcessBookingI18N()

    const isCity = !!model.city?.slug

    const declineCouponForBooking = useCaseDeclineCouponForBooking();

    const sendCouponEmail = useCaseSendCouponEmail();

    const typeSale = model.coupon?.type === 'percentage' ? '%' : 'USD'
    const couponValue = `- ${model.coupon?.value}${typeSale} ${i18n.offMark}`



    const pathAllTours = getHrefLocale(model.option.page.locale, PAID_TOUR_IN_CITY.getPathByLocale(model.option.page.locale, model.city?.slug))
    return (
        <BaseModal close={declineCouponForBooking} maxWidth={600} isLoading={isLoading}>

            <div className="congratulations_model">
                <div className="congratulations_model__top">
                    <h3 className="congratulations_model__title">{model?.congratulationModal?.titles?.text}</h3>
                    <p className="congratulations_model__description">{model?.congratulationModal?.descriptions?.text}</p>
                </div>
                <div className="content">
                    {model.tours.map(tour => {
                        return (
                            <CongratulationCard
                                attachment={tour.image}
                                sale={couponValue}
                                key={tour.id}
                                title={tour.title}
                                url={getHrefLocale(tour.locale, `${tour.city?.slug}/${PATH_TOURS}/${tour.slug}`)}
                            />
                        )
                    })}

                </div>
                <div className="congratulations_model__footer">
                    {isCity &&
                        <Link
                            href={`${pathAllTours}`}
                            className="congratulations_model__footer__item"
                        >
                            {model?.congratulationModal?.linkAllPage?.text}
                        </Link>
                    }
                    <Button
                        customClass={'button_custom congratulations_model__footer__item congratulations_model__footer__item__success'}
                        onClick={sendCouponEmail}
                    >
                        {model?.congratulationModal?.callToActions?.text}
                    </Button>
                    <Button
                        customClass={'button_custom no_thanks congratulations_model__footer__item'}
                        onClick={declineCouponForBooking}
                    >
                        {model.congratulationModal?.buttonsCancel?.text}
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
})

export default CongratulationsModel

