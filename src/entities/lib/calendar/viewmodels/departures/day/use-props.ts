import {useLocalObservable} from "mobx-react-lite";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {MODAL, ModalStepsModel} from "@entities/lib/calendar/models/modal-steps.model";
import {DepBooking} from "@entities/lib/calendar/@types";
import {ViewModel} from "@entities/lib/calendar/viewmodels/departures/day/view";
import {useContextProcessBookingStore} from "@entities/lib/calendar/process-booking.provider";
interface Props {
    modals: ModalStepsModel
    depModel: DeparturesModel
    onClose(): void
    onBooking(dep: DepBooking): void
}


export function useDeparturesDayProps({modals, depModel, onBooking, onClose}: Props): ViewModel {

    return useLocalObservable(() => ({
        get departures() {
          return depModel.listByDays.deps
        },
        get nameDayWeek() {
          return depModel.option.page.nameDayWeek
        },
        get halfOpacity() {
            return Object.values(modals.modals).filter(v => v.visibly).length > 2
        },
        get isOpen() {
            return modals.modals[MODAL.DAY_LIST].visibly
        },
        get title() {
            return depModel.option.page.title
        },
        get isAbove() {
            const m = modals.modals;
            return !m[MODAL.FORM_BOOKING].visibly && m[MODAL.DAY_LIST].visibly
        },
        isLoading: false,
        saveButton: false,
        onBooking,
        onClose,
    }))
}