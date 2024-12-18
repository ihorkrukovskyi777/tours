import Image from "next/image";
import ClockSilver from "/public/images/svg/clock-silver.svg"
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";
import FlagsComponents from "@/shared/ui/flags";
import Loader from "@/shared/ui/loaders/default-loader";
import './style.css';


export default function TourItem({
                                     onBooking = () => {
                                     },
                                     isShowBooking = false,
                                     dep,
                                     locale,
                                     onClick,
                                     i18n,
                                     hideLocale = false,
                                     isActive = false,
                                     isLoading = false,
                                 }) {
    const {hours, minutes} = toHoursAndMinutes(dep.time);
    const {hours: durationHours, minutes: durationMinutes} = toHoursAndMinutes(dep.duration * 60);

    const getTime = () => {
        if (dep.is_self_guide) {
            return i18n.flexible
        }

        return `${pad2(hours)}:${pad2(minutes)}`
    }

    return (
        <div className={`tours_wrap ${isActive ? 'active' : ''}`}>
            <div className="tour_block" onClick={() => onClick(dep)}>
                <div className="top_part">
                    <div className="tour_name">{dep.tourTitle}</div>
                    {!hideLocale && <div className="tour_hour">{getTime()}</div>}
                </div>
                <div className="bottom_part">
                    <div className="tour_duration">
                        <div className="clock_wrap">
                            <Image src={ClockSilver} alt="clock" width={12} height={13}></Image>
                        </div>
                        <span>{durationHours}:{pad2(durationMinutes)} {dep.duration > 1 ? i18n.hours : i18n.hour}</span>
                    </div>
                    {hideLocale && <div className="tour_hour">{getTime()}</div>}
                    {!hideLocale &&
                        <div className="tour_language">
                            <FlagsComponents locale={locale} alt={`flag ${locale}`}/>
                        </div>
                    }
                </div>

                {isShowBooking &&
                    <div className="btns-wrap">
                        <button onClick={onBooking} className="dep_book_now">{i18n.book_now}</button>
                        {isLoading && <Loader /> }
                    </div>

                }
            </div>
        </div>
    )
}

