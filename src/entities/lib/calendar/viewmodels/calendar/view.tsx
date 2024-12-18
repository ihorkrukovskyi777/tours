import {observer} from "mobx-react-lite";
import CloseSvg from "@/assets/images/svg/close-svg";
import ModalBooking from "@entities/calendar/ui/modal-booking";
import Loader from "@shared/ui/loaders/default-loader";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import Calendar from "@entities/calendar/ui/items";
import {ReactNode} from "react";
import useEscHooks from "@/shared/hooks/use-esc-event";
import {Day} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {ActiveLocale} from "@entities/lib/calendar/@types/locales";
import {DeparturesByDate} from "@entities/lib/calendar/models/departures/calendar.model";

export interface ViewModel {
    isOpen: boolean
    halfOpacity: boolean
    isLoading: boolean
    isAbove: boolean
    title: string
    locale: string
    onClose():void
    onSelectDep(dep: Day): void
    departures: DeparturesByDate
    availableLocale: ActiveLocale[]
    changeMonthAndYearn({ year, month}: { year: number, month: number}): void
}
interface Props {
    viewModel: ViewModel
    children?: ReactNode
    size?: string
}

const CalendarView = observer(({viewModel, children, size = ''}: Props) => {
    const i18n = useContextProcessBookingI18N()
    useEscHooks(viewModel.onClose, viewModel.isAbove)
    return (
        <ModalBooking
            show={viewModel.isOpen}
            size={size}
            halfOpacity={viewModel.halfOpacity}
            close={viewModel.onClose}
        >
            <div className={`step-1 ${size}`}>
                <div className="title">
                    <div className="title_text">{viewModel.title}</div>
                    <div className="close-button" onClick={viewModel.onClose}>
                        <CloseSvg/>
                    </div>
                </div>
                {children}
                <Calendar
                    i18n={{months: i18n.months}}
                    onChange={viewModel.onSelectDep}
                    departures={viewModel.departures}
                    changeDate={viewModel.changeMonthAndYearn}
                >
                    {viewModel.isLoading ? <Loader style={{opacity: "0.5"}}/> : null}
                </Calendar>

            </div>
        </ModalBooking>
    )
})

export default CalendarView