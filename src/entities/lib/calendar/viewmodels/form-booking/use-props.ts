import {useContextProcessBookingStore} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {useCaseFetchBooking} from "@entities/lib/calendar/usecases";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {useCaseChangeModalBooking, useCaseCloseModalBooking} from "@entities/lib/calendar/usecases/modals";

export function useFormBookingProps() {
    const store = useContextProcessBookingStore()

    const onFetchBookingDepartures = useCaseFetchBooking();
    const onChangeBookingModal = useCaseChangeModalBooking()
    const onCloseBookingModal = useCaseCloseModalBooking()
    return useLocalObservable(() => ({
        get selectedLocale() {
            return store.option.locale
        },
        get errors() {
            return store.formBooking.errors
        },
        get people() {
            return store.option.peopleNumber
        },
        get siteLocale() {
            return store.option.page.locale
        },
        get nameDayWeek() {
            return store.option.page.nameDayWeek
        },
        get phones() {
            return store.formBooking.phone.phones.value
        },
        get isOpened() {
            return store.modals.modals[MODAL.FORM_BOOKING].visibly
        },
        get departure() {
            return store.formBooking.departure
        },

        get isLoading() {
            return store.loading.isBookingLoading
        },
        get halfOpacity() {
            return Object.values(store.modals.modals).filter(v => v.visibly).length > 1
        },
        isRedirect: false,
        onClose: onCloseBookingModal,
        onFetchBookingDepartures,
        onOpenCalendar: onChangeBookingModal,
    }))
}