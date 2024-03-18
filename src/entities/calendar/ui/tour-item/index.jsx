import Image from "next/image";
import ClockSilver from "/public/images/svg/clock-silver.svg"
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";
import FlagsComponents from "@/shared/ui/flags";
import './style.css';

export default function TourItem({dep, locale, onClick, i18n}) {
    const {hours, minutes} = toHoursAndMinutes(dep.time);
    const {hours: durationHours, minutes: durationMinutes} = toHoursAndMinutes(dep.duration * 60);

    return (
        <div className="tours_wrap" onClick={() => onClick(dep)}>
            <div className="tour_block">
                <div className="top_part">
                    <div className="tour_name">{dep.tourTitle}</div>
                    <div className="tour_hour">{pad2(hours)}:{pad2(minutes)}</div>
                </div>
                <div className="bottom_part">
                    <div className="tour_duration">
                        <div className="clock_wrap">
                            <Image src={ClockSilver} alt="clock" width={12} height={13}></Image>
                        </div>
                        <span>{durationHours}:{pad2(durationMinutes)} { durationHours > 1 ? i18n.hours : i18n.hour}</span>
                    </div>
                    <div className="tour_language">
                        <FlagsComponents locale={locale} alt={`flag ${locale}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

