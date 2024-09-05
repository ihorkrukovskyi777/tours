import ClockSvg from '@/assets/images/svg/clock-svg';
import classNames from 'classnames';
import {pad2, toHoursAndMinutes} from "@/shared/helpers/date";
import './style.css';


export default function ModalTourItem({i18n, dep, onSelected, isActive}) {
    const {hours, minutes} = toHoursAndMinutes(dep.time);
    const durationFormat = toHoursAndMinutes(dep.duration * 60);
    const getTime = () => {
        if (dep.is_self_guide) {
            return i18n.flexible
        }

        return `${pad2(hours)}:${pad2(minutes)}`
    }
    return (
        <div className={classNames('modal-tour-item', {'active': isActive})} onClick={onSelected}>
            <h5>{dep.tourTitle}</h5>
            <div className="tour-item__time">
                <div className="start-time">{getTime()}</div>
                <div className="duration">
                    <div className="clock-wrap">
                        <ClockSvg/>
                    </div>
                    <span>{durationFormat.hours}:{pad2(durationFormat.minutes)} { dep.duration > 1 ? i18n.hours : i18n.hour}</span>
                </div>
            </div>
        </div>
    )
}

