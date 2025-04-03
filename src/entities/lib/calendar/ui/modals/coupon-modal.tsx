'use client'
import {observer} from "mobx-react-lite";
import BaseModal from "@entities/lib/calendar/ui/modals/base-modal/base-modal";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import Button from "@shared/ui/selectors/button/button";
import {CouponModel} from "@entities/lib/calendar/models/coupon.model";
import {useAnalytics} from "@entities/analytics/analytics.provider";
interface Props {
    onConfirm(): void
    onCancel(): void
    isLoading: boolean
    model: CouponModel
}

const CouponModal = observer(({onConfirm, onCancel, model, isLoading}: Props) => {
    const analytics = useAnalytics()
    const i18n = useContextProcessBookingI18N()

    const closeHandler = () => {
        analytics?.addEvent({
            type: 'close_coupon_modal'
        })
        onCancel();
    }

    const confirmHandler = () => {
        analytics?.addEvent({
            type: 'accepted_the_coupon'
        })
        onConfirm();
    }
    return (
        <BaseModal close={closeHandler} maxWidth={600} isLoading={isLoading}>
            <div className="title process_booking_line" >
                <div className="title-text">{model?.offerModal?.titles?.text}</div>
                <div className="process_booking_line__block">
                    <div className="process_booking_line__line">
                        <div className="process_booking_line__circle" style={{width: '100%'}}></div>
                    </div>
                    <ul>
                        <li>{i18n.details}</li>
                        <li>{i18n.booking_confirmed}</li>
                        <li>{i18n.done}</li>
                    </ul>
                </div>
            </div>
            <div className="title" dangerouslySetInnerHTML={{__html: model?.offerModal?.descriptions?.text}}></div>

            <Button onClick={confirmHandler} customClass={'button_custom'} >{model?.offerModal?.callToActions?.text}</Button>
            <Button onClick={closeHandler}  customClass={'button_custom no_thanks'} >{model.offerModal?.buttonsCancel?.text}</Button>
        </BaseModal>
    )
})

export default CouponModal