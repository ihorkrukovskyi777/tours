import {memo} from "react"
import ClockSvg from '@/assets/images/svg/clock-svg';
import {pad2, toHoursAndMinutes} from "@/shared/hepers/date";
import {useTranslation} from "@/i18n/client";
import FlagsComponents from "@/shared/ui/flags";
import './style.css';

export default memo(function TourItem({dep, locale, onClick}) {
    const {t} = useTranslation();
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
                            <ClockSvg/>
                        </div>
                        <span>{durationHours}:{pad2(durationMinutes)} {t('Hours')}</span>
                    </div>
                    <div className="tour_language">
                        <FlagsComponents locale={locale} alt={`flag ${locale}`}/>
                    </div>
                </div>
            </div>
        </div>
    )
})

