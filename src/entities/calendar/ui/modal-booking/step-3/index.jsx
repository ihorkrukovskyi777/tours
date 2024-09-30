import {observer} from "mobx-react-lite";
import Button from '@/shared/ui/selectors/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import FullStarSvg from '@/assets/images/svg/full-star';
import FormCalendar from './form';
import {toHoursAndMinutes, pad2} from "@/shared/helpers/date";
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/helpers/date";
import useEscHooks from "@/shared/hooks/use-esc-event";
import IcloudImage from "@/shared/ui/icloud-image";
import FlagsComponents from "@/shared/ui/flags";
import {ServiceDate} from "@/shared/service/service-date"
//svg
import ClockSvg from "@/assets/images/svg/clock-svg";
import LogoSvg from "@/assets/images/svg/logo-svg";

import './style.css';

export default observer(function Step3({
                                           i18n,
                                           onChange,
                                           people,
                                           errors,
                                           selectedLocale,
                                           locale,
                                           fetchBookingDeparture,
                                           close,
                                           size,
                                           allPhoneNumbers,
                                           departure,
                                           isOpened,
                                           langSelected,
                                           isLoading,
                                           nameDayWeek = true
                                       }) {

    useEscHooks(close, isOpened);


    if (!departure) {
        return null;
    }
    const serviceDate = new ServiceDate(setFormatDDMMYYYYtoMMDDYYYY(departure.date), nameDayWeek);
    const time = toHoursAndMinutes(departure.time);
    const duration = toHoursAndMinutes(departure.duration * 60);


    const isShowTimeDep = !departure.is_self_guide
    return (
        <div className={`step-3 ${size}`}>
            <div className="subtitle">
                <div className="logo"><LogoSvg/></div>
                <div className="close-button" onClick={close}>
                    <CloseSvg/>
                </div>
            </div>
            <div className="title">
                <div className="title-text">{departure.tourTitle}</div>
            </div>

            <div className="flex-change">
                <div className="flex-box">
                    <div className="item-data">
                        <div className="choosen-date">{departure.dateLabel}</div>
                        <div
                            className="time-current-modal">
                            <span>{i18n.days[serviceDate.day]}, {serviceDate.dayNum} {i18n.months[serviceDate.month]} </span>
                            {isShowTimeDep ? <span>{pad2(time.hours)}:{pad2(time.minutes)}</span> : null }
                            {isShowTimeDep ? <span className="comma">,</span> : null}
                        </div>

                    </div>
                    <div className="append-wrap2">
                        <div className="tour-item step-next">
                            <div className="tour-item__time">
                                <div className="duration">
                                    <div className="clock-wrap"><ClockSvg/></div>
                                    <span>{duration.hours}:{pad2(duration.minutes)} {departure.duration > 1 ? i18n.hours : i18n.hour}</span>
                                </div>
                                <div className="people">
                                    <span className="comma">,</span>
                                    <span className="people-count">{people}</span>{i18n.people}
                                </div>
                                <FlagsComponents
                                    className='country-box-select'
                                    locale={selectedLocale}
                                    alt={`flag ${selectedLocale}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="center-wrap">
                    <Button className="change" onClick={onChange}>{i18n.change}</Button>
                </div>
            </div>
                <FormCalendar
                    i18n={i18n}
                    errorsMessage={errors}
                    allPhoneNumbers={allPhoneNumbers}
                    locale={locale}
                    isLoading={isLoading}
                    fetchBookingDeparture={fetchBookingDeparture}/>
        </div>
    )
})




