import {observer} from "mobx-react-lite";
import Step3 from "@entities/calendar/ui/modal-booking/step-3";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import ModalBooking from "@entities/calendar/ui/modal-booking";
import {useFormBookingProps} from "@entities/lib/calendar/viewmodels/form-booking/use-props";

const FormBookingView = observer(() => {
    const i18n = useContextProcessBookingI18N()
    const props = useFormBookingProps()

    return (
        <ModalBooking
            size={'step-3'}
            show={props.isOpened}
            halfOpacity={props.halfOpacity}
            close={props.onClose}
        >
            <Step3
                // @ts-ignore
                i18n={i18n}
                errors={props.errors}
                people={props.people}
                locale={props.siteLocale}
                nameDayWeek={props.nameDayWeek}
                selectedLocale={props.selectedLocale}
                fetchBookingDeparture={props.onFetchBookingDepartures}
                size="large"
                isRedirect={false}
                onChange={props.onOpenCalendar}
                allPhoneNumbers={props.phones}
                isOpened={props.isOpened}
                departure={props.departure}
                isLoading={props.isLoading}
                close={props.onClose}
            />
        </ModalBooking>
    )
})

export default FormBookingView