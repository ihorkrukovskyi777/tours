import {observer} from "mobx-react-lite";
import Step3 from "@entities/calendar/ui/modal-booking/step-3";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import ModalBooking from "@entities/calendar/ui/modal-booking";
import {useFormBookingProps} from "@entities/lib/calendar/viewmodels/form-booking/use-props";
import Loader from '@shared/ui/loaders/default-loader';
import CivitatisCategoriesView from "@entities/lib/calendar/viewmodels/civitatis-categories-count/view";

const FormBookingView = observer(() => {
    const i18n = useContextProcessBookingI18N()
    const props = useFormBookingProps()

    return (
        <ModalBooking
            size={'step-3'}
            style={{position: 'relative'}}
            show={props.isOpened}
            halfOpacity={props.halfOpacity}
            close={props.onClose}
        >
            {props.isLoadingCategories &&  <Loader style={{opacity: '0.5', left: 0, zIndex: 2}}/>}

            <Step3
                // @ts-ignore
                i18n={i18n}
                errors={props.errors}
                people={props.people}
                categories={props.categories ? <CivitatisCategoriesView  /> : null}
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
            >

            </Step3>
        </ModalBooking>
    )
})

export default FormBookingView