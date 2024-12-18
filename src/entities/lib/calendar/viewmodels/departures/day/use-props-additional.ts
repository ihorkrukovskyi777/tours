import {useLocalObservable} from "mobx-react-lite";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {ViewModel} from "@entities/lib/calendar/viewmodels/departures/day/view";
import {
    useContextProcessBookingI18N,
    useContextProcessBookingStore
} from "@entities/lib/calendar/process-booking.provider";
import {useCaseFetchBookingAdditional} from "@entities/lib/calendar/usecases";


export function useDeparturesDayProps(): ViewModel {
    const store = useContextProcessBookingStore()
    const i18n = useContextProcessBookingI18N()
    const onBooking = useCaseFetchBookingAdditional();
    return useLocalObservable(() => ({
        get depModel() {
            return store.additionalSales.selectTourCalendar.departuresModel?.departuresCalendar
        },
        get departures() {
            return this.depModel?.listByDays.deps ?? []
        },
        get nameDayWeek() {
            return this.depModel?.option.page.nameDayWeek ?? false
        },
        get halfOpacity() {
            return true
        },
        get isOpen() {
            return store.modals.modals[MODAL.ADDITIONAL_SALES_DEP_DAY].visibly
        },
        get title() {
            return this.depModel?.option.page.title ?? ''
        },
        get isAbove() {
            return true
        },
        get isLoading() {
            return store.loading.isAdditionalBooking
        },
        saveButtonText: i18n.book_now,
        saveButton: true,
        onBooking,
        onClose: () => store.modals.closeModal(MODAL.ADDITIONAL_SALES_DEP_DAY),
    }))
}