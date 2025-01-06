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
        get categories() {
            return store.formBooking.civitatisCategorySelected
        },
        get errors() {
            return store.formBooking.errors
        },
        get people() {
            if(store.formBooking.civitatisCategorySelected) {
                return store.formBooking.civitatisCategorySelected.total
            }
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
        get zIndex() {
            return store.modals.modals[MODAL.FORM_BOOKING].zIndex ?? null
        },
        get departure() {
            return store.formBooking.departure
        },

        get isLoading() {
            return store.loading.isBookingLoading
        },
        get isLoadingCategories() {
            return store.loading.isLoadingCategories
        },
        get halfOpacity() {
            return Object.values(store.modals.modals).filter(v => v.visibly).length > 1
        },
        isRedirect: false,
        onClose: onCloseBookingModal,
        onFetchBookingDepartures,
        onOpenCalendar: () => {

            if(store.formBooking.lastBookingPeopleNumber) {
                store.modals.closeModal(MODAL.FORM_BOOKING)
                store.modals.closeModal(MODAL.ADDITIONAL_SALES_DEP_DAY)
            } else {
                onChangeBookingModal();
            }
        },
    }))
}