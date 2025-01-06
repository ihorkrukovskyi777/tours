import {observer} from "mobx-react-lite";
import Button from '@/shared/ui/selectors/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';

import FormCalendar from './form';
import {toHoursAndMinutes, pad2} from "@/shared/helpers/date";
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/helpers/date";
import useEscHooks from "@/shared/hooks/use-esc-event";
import ProcessBookingLine from "@/entities/lib/calendar/ui/process-booking-line";
import FlagsComponents from "@/shared/ui/flags";
import {ServiceDate} from "@/shared/service/service-date"
//svg
import ClockSvg from "@/assets/images/svg/clock-svg";
import LogoSvg from "@/assets/images/svg/logo-svg";

import './style.css';

export default observer(function Step3({
                                           isRedirect = true,
                                           i18n,
                                           categories = null,
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
                                           isLoading,
                                           nameDayWeek = true,
                                           hideButtonChange = false
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
            {/*<div className="title">*/}
            {/*    <div className="title-text">{departure.tourTitle}</div>*/}
            {/*</div>*/}
            <ProcessBookingLine title={departure.tourTitle} step={1}/>
            <div className="flex-change">
                <div className="flex-box">
                    <div className="item-data">
                        {departure.dateLabel && <div className="choosen-date">{departure.dateLabel}</div>}
                        <div
                            className="time-current-modal">
                            <span>{i18n.days[serviceDate.day]}, {serviceDate.dayNum} {i18n.months[serviceDate.month]} </span>
                            {isShowTimeDep ? <span>{pad2(time.hours)}:{pad2(time.minutes)}</span> : null}
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
                {!hideButtonChange &&
                    <div className="center-wrap">
                        <Button className="change" onClick={onChange}>{i18n.change}</Button>
                    </div>
                }

            </div>
            <div className="dsadsasda">
                {categories}
            </div>
            <FormCalendar
                isRedirect={isRedirect}
                i18n={i18n}
                errorsMessage={errors}
                allPhoneNumbers={allPhoneNumbers}
                locale={locale}
                isLoading={isLoading}
                fetchBookingDeparture={fetchBookingDeparture}/>
        </div>
    )
})




