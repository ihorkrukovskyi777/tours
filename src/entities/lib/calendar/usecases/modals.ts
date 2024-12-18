import {useContextProcessBookingStore as useContextStore} from "@entities/lib/calendar/process-booking.provider";
import {useCallback} from "react";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {Day} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {DepBooking} from "@entities/lib/calendar/@types";
import {toJS} from "mobx";


export function useCaseOpenCalendar() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.openModal(MODAL.CALENDAR)
    }, [store])
}

export function useCaseCloseCalendar() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.CALENDAR)
    }, [store])
}

export function useCaseCloseDeparturesDay() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.DAY_LIST)


    }, [store])
}

export function useCaseOpenDeparturesDay() {
    const store = useContextStore();
    return useCallback(function (dep: Day) {
        store.depModel.listByDays.setToursByDay(dep)
        store.modals.openModal(MODAL.DAY_LIST)
    }, [store])
}

export function useCaseChangeModalBooking() {
    const store = useContextStore();
    const onCloseBooking = useCaseCloseModalBooking()
    const onOpenCalendar = useCaseOpenCalendar()
    return useCallback(function () {
        if (store.modals.modals[MODAL.DAY_LIST].visibly) {
            onCloseBooking()
        } else {
            onCloseBooking()
            onOpenCalendar()
        }

    }, [store])
}

export function useCaseCloseModalBooking() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.FORM_BOOKING)
    }, [store])
}

export function useCaseBooking() {
    const store = useContextStore();
    return useCallback(function (dep: DepBooking) {
        store.modals.openModal(MODAL.FORM_BOOKING)
        store.formBooking.setDeparture(dep)
    }, [store])
}


export function useCaseCloseModalAdditional() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.ADDITIONAL_SALES)

    }, [store])
}

export function useCaseOpenAdditionalCalendar() {
    const store = useContextStore();
    return useCallback(async function (id: number) {
        try {
            store.loading.set('additional')
            store.modals.openModal(MODAL.ADDITIONAL_SALES_CALENDAR)
            await store.additionalSales.setCalendarTourId(id);
        } catch (err) {
            console.log(err)
        } finally {
            store.loading.turnOff('additional')
        }
    }, [store])
}


export function useCaseAdditionalCloseCalendar() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.ADDITIONAL_SALES_CALENDAR)
    }, [store])
}