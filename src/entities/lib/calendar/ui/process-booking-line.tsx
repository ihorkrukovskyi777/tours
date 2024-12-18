import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import '@entities/lib/calendar/ui/styles/process-booking-line.css'
interface Props {
    title: string
    step: number
}
const ProcessBookingLine = ({title, step}: Props) => {
    const i18n = useContextProcessBookingI18N()

    const width = step === 1 ? 0 : '50%'
    return (
        <div className="title process_booking_line">
            <div className="title-text">{title}</div>

            <div className="process_booking_line__block">
                <div className="process_booking_line__line">
                    <div className="process_booking_line__circle" style={{width: width}}></div>
                </div>
                <ul>
                    <li>{i18n.details}</li>
                    <li>{i18n.booking_confirmed}</li>
                    <li>{i18n.done}</li>
                </ul>
            </div>
        </div>
    )
}

export default ProcessBookingLine