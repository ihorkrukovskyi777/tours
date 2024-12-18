import {useLocalObservable} from "mobx-react-lite";

import {MODAL, } from "@entities/lib/calendar/models/modal-steps.model";
import {useCaseCloseCalendar, useCaseOpenDeparturesDay} from "@entities/lib/calendar/usecases/modals";
import {useContextProcessBookingStore} from "@entities/lib/calendar/process-booking.provider";
import {ViewModel} from "@entities/lib/calendar/viewmodels/calendar/view";




export function useCalendarProps(): ViewModel {
    const store = useContextProcessBookingStore()
    const onClose = useCaseCloseCalendar();
    const onSelectDep = useCaseOpenDeparturesDay();
    return useLocalObservable(() => ({
        get isLoading() {
            return store.loading.isMainLoading
        },

        get isOpen() {
            return store.modals.modals[MODAL.CALENDAR].visibly
        },
        get isAbove() {
            return store.modals.modals[MODAL.CALENDAR].visibly && Object.values(store.modals.modals).filter(v => v.visibly).length === 1
        },
        get departures() {
            return store.depModel.calendar.departures
        },
        get halfOpacity() {
            return Object.values(store.modals.modals).filter(v => v.visibly).length > 1
        },
        get locale() {
            return store.depModel.option.locale
        },
        get title() {
            return store.depModel.option.page.title
        },

        get availableLocale() {
            return store.depModel.option.availableLocale
        },
        changeMonthAndYearn({ year, month}: { year: number, month: number}) {
            store.depModel.calendar.changeMonthAndYearn({year, month})
        },
        onClose,
        onSelectDep,
    }), {})
}