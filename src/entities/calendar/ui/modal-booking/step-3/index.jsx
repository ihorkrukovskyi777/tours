import Button from '../../../../../shared/ui/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import FullStarSvg from '@/assets/images/svg/full-star';
import FormCalendar from './form';

import {atomModalBooking} from "@/entities/calendar/atom/modal";
import {atomDaysName, atomPeople, atomSelectedDep} from "@/entities/calendar/atom/departures";
import {useAtomValue} from "jotai/index";

import './style.css';
import ClockSvg from "@/assets/images/svg/clock-svg";
import {useTranslation} from "@/i18n/client";

export default function Step3({changeTime, close, size, allPhoneNumbers, selectedDeparture, language}) {

    const { t } = useTranslation();

    console.log(t, 'ttt')
    const selectedDep = useAtomValue(atomSelectedDep)
    const people = useAtomValue(atomPeople)
    const daysName = useAtomValue(atomDaysName)


    if (!selectedDep) {
        return null;
    }

    console.log(selectedDep, 'selectedDep')

    return (
        <div className={`step-3 ${size}`}>
            <div className="subtitle">
                <div className="subtitle-text">Your booking details. You&apos;re almost there!</div>
                <div className="close-button" onClick={close}>
                    <CloseSvg/>
                </div>
            </div>

            <div className="title">
                <div className="title-intro">
                    <div className="subtitle-text subtitle-text-mobile">Your booking details. &apos; almost there!</div>
                    <div className="title-text">{selectedDep.title}</div>
                </div>
                <div className="guide">
                    <div className="photo-wrap">
                        <img src={selectedDep.subVendor.avatar} alt=""/>
                    </div>
                    <div className="guide-info">
                        <div className="guide-name">Dsf</div>
                        <div className="guide-rate">
                            <div className="icon-wrap">
                                <FullStarSvg width={20} height={20}/>
                            </div>
                            <span>{selectedDep.subVendor.ranking}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-change">
                <div className="flex-box">
                    <div className="item-data">
                        <div className="choosen-date">{daysName[selectedDep.date]}</div>
                        <div className="time-current-modal">{selectedDep.time}</div>
                        <span>,</span>
                    </div>
                    <div className="append-wrap2">
                        <div className="tour-item step-next" id-tour="">
                            <div className="tour-item__time">
                                <div className="duration">
                                    <div className="clock-wrap"><ClockSvg/></div>
                                    <span>{selectedDep.duration} Hour</span>
                                </div>
                                <div className="people">
                                    <span className="comma">,</span>
                                    <span className="people-count">{people}</span>People
                                </div>
                                ----image
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-wrap">
                    <Button className="change" onClick={changeTime}>{t('Change')}</Button>

                </div>
            </div>

            <FormCalendar allPhoneNumbers={allPhoneNumbers} language={language}/>


        </div>
    )
}




