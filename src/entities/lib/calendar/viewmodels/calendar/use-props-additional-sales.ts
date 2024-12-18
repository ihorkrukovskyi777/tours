import {useLocalObservable} from "mobx-react-lite";

import {MODAL, } from "@entities/lib/calendar/models/modal-steps.model";
import {
    useCaseAdditionalCloseCalendar,
} from "@entities/lib/calendar/usecases/modals";
import {useContextProcessBookingStore} from "@entities/lib/calendar/process-booking.provider";
import {ViewModel} from "@entities/lib/calendar/viewmodels/calendar/view";
import {useCaseOpenDeparturesDayAdditional} from "@entities/lib/calendar/usecases";


export function useCalendarAdditionalSalesProps(): ViewModel {
    const {modals, additionalSales, loading} = useContextProcessBookingStore()
    const onClose = useCaseAdditionalCloseCalendar();
    const onSelectDep = useCaseOpenDeparturesDayAdditional();

    return useLocalObservable(() => ({

        get isLoading() {
            return loading.isMainLoading
        },

        get isOpen() {
            return modals.modals[MODAL.ADDITIONAL_SALES_CALENDAR].visibly
        },
        get isAbove() {
            return modals.modals[MODAL.ADDITIONAL_SALES_CALENDAR].visibly
                && modals.modals[MODAL.ADDITIONAL_SALES].visibly
                && Object.values(modals.modals).filter(v => v.visibly).length === 2
        },
        get departures() {
            return additionalSales.selectTourCalendar.departuresModel?.departuresCalendar.calendar.departures ?? {}
        },
        get halfOpacity() {
            return Object.values(modals.modals).filter(v => v.visibly).length > 1
        },
        get locale() {
            return additionalSales.option.locale
        },
        get title() {
            return additionalSales.option.page.title
        },

        get availableLocale() {
            return []
        },
        changeMonthAndYearn(date: { year: number, month: number}) {
            additionalSales.selectTourCalendar.departuresModel?.departuresCalendar.calendar.changeMonthAndYearn(date)
        },

        onClose,
        onSelectDep,
    }), {})
}