'use client'
import {observer} from "mobx-react-lite";
import Step2 from '@/entities/calendar/ui/modal-booking/step-2'
import ModalBooking from "@entities/calendar/ui/modal-booking";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import {DepBooking} from "@entities/lib/calendar/@types";
export interface ViewModel {
    departures: DepBooking[],
    nameDayWeek: boolean
    saveButton: boolean
    halfOpacity: boolean
    isOpen: boolean
    title: string
    isAbove: boolean
    saveButtonText?: string,
    isLoading: boolean
    onClose(): void
    onBooking(dep: DepBooking): void
}
interface Props {
    viewModel: ViewModel
}

const DeparturesDayItemsView = observer(({viewModel}: Props) => {
    const {isOpen, halfOpacity, onClose, nameDayWeek, departures , isAbove, title, onBooking}  = viewModel
    const i18n = useContextProcessBookingI18N()
    return (
        <ModalBooking
            show={isOpen}
            size={'step-2'}
            halfOpacity={halfOpacity}
            close={onClose}
        >
            <>
                <Step2
                    i18n={i18n}
                    saveButtonText={viewModel.saveButtonText}
                    departures={departures}
                    nameDayWeek={nameDayWeek}
                    title={title}
                    close={onClose}
                    isLoading={viewModel.isLoading}
                    onBack={onClose}
                    isOpened={isAbove}
                    setDeparture={onBooking}
                    saveButton={viewModel.saveButton}
                />
            </>
        </ModalBooking>
    )
})

export default DeparturesDayItemsView