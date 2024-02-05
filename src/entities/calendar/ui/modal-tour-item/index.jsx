import ClockSvg from '@/assets/images/svg/clock-svg';
import classNames from 'classnames';
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";
import {useTranslation} from "@/i18n/client";
import './style.css';


export default function ModalTourItem({i18n, dep, onSelected, isActive}) {
    const { t } = useTranslation();
    const {hours, minutes} = toHoursAndMinutes(dep.time);
    const durationFormat = toHoursAndMinutes(dep.duration * 60);
    return (
        <div className={classNames('modal-tour-item', {'active': isActive})} onClick={onSelected}>
            <h5>{dep.tourTitle}</h5>
            <div className="tour-item__time">
                <div className="start-time">{pad2(hours)}:{pad2(minutes)}</div>
                <div className="duration">
                    <div className="clock-wrap">
                        <ClockSvg/>
                    </div>
                    <span>{durationFormat.hours}:{pad2(durationFormat.minutes)} {i18n.hours}</span>
                </div>
            </div>
        </div>
    )
}

