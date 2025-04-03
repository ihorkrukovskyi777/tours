'use client'
import {observer} from "mobx-react-lite";
import {useLocale} from "use-intl";
import {BokunWidgetModel} from "@entities/paid-tour/models/bokun-widget-model";
import SpinnerCircle from "@/bokun-widget/src/ui/spinner/spinner-circle";
import {Modal} from 'react-responsive-modal';
import ModalOnlyCheckout from "@/bokun-widget/src/views/checkout/modal-only-checkout";
import BokunChoiceAnOrderView from "@/bokun-widget/src/bokun-choice-an-order.view";
import {useSearchParams} from "next/navigation";
import {useClientModel} from "@shared/hooks/use-client-model";
import PickADate from "@entities/paid-tour/views/pick-a-date.view";
import {Ii18n} from "@/bokun-widget/src/common/i18n.type";
import Logo from "@/shared/ui/layouts/header/logo";
import './styles/booking-view.scss'
import 'react-responsive-modal/styles.css';
import {useAnalytics} from "@entities/analytics/analytics.provider";

interface Props {

    bokun_id: number
    i18n: Ii18n
}

const BookingWidgetView = observer(({bokun_id, i18n}: Props) => {
    const locale = useLocale()
    const search = useSearchParams()
    const model = useClientModel<BokunWidgetModel>(() => new BokunWidgetModel(locale, bokun_id))
    const analytics = useAnalytics()
    const depLength = model.firstDepartures.length;
    const booking_hash = search.get('booking_hash')

    const isShowBooking = (!!depLength) || (model.loader.isLoading && depLength === 0);

    const pickHandler = async () => {
        await model.toggleModal();
        analytics?.addEventNoLastDuplicate({
            type: 'pick_a_date_paid_tour'
        })
    }
    const pickFullDate = async (fullDate: string) => {
        await model.onPickFullDate(fullDate)
        analytics?.addEventNoLastDuplicate({
            type: 'pick_a_date_paid_tour_full_date'
        })
    }

    return (
        <div className="booking_view">
            {model.loader.isLoading &&
                <div className="booking_view__loading">
                    <SpinnerCircle isLoading={model.loader.isLoading}/>
                </div>
            }

            {isShowBooking &&
                <PickADate
                    perLabel={`${i18n.per} ${model.perLabel ?? ''}`}
                    onPick={pickHandler}
                    onPickDate={pickFullDate}
                    price={model.price}
                    upcoming={model.firstDepartures}
                    disabled={!model.choice_an_order.availabilityBooking}
                />
            }

            {booking_hash && <div className="bokun_view__modal"><ModalOnlyCheckout i18n={i18n} locale={locale} booking_hash={booking_hash}/></div>}
            <Modal
                classNames={{
                    modal: `booking_view__modal`,
                }}
                open={model.is_open_modal}
                onClose={model.toggleModal}
                center
            >
                <BokunChoiceAnOrderView
                    model={model.choice_an_order}
                    i18n={i18n}
                >
                    <Logo/>
                </BokunChoiceAnOrderView>
            </Modal>
        </div>
    )
})

export default BookingWidgetView