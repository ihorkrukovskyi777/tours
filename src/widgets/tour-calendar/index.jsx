'use client';
import Button from "../../shared/ui/button/button";
import ModalBooking from "@/shared/ui/modal-booking";
import CalendarSvg from '@/assets/images/svg/calendar-svg'
import CounterNumbers from "@/shared/ui/counter-numbers";
import TabsLanguages from "@/shared/ui/tabs-languages";
import TourItem from "@/shared/ui/tour-item";
import Step1 from "@/shared/ui/modal-booking/step-1";
import Step2 from "@/shared/ui/modal-booking/step-2";
import Step3 from "@/shared/ui/modal-booking/step-3";
import {useState, useEffect} from "react";
import {getCountryPhone} from '@/entities/api/getCountryPhone';
import {getTours} from "@/entities/api/getTours";
import CalendarLogo from "@/assets/images/svg/calendar-logo";
import Loader from "src/shared/ui/loaders/default-loader";
import Faqs from "../faqs/faqs";
import LanguageLoader from "@/shared/ui/loaders/language-loader";
import TourLogic from "@/entities/calendar/service/tour-logic";

import './style.css';
const STEP_MODAL = {
    1: Step1,
    2: Step2,
    3: Step3,
}
export default function TourCalendar() {

    const [showModal, setShowModal] = useState(false);
    const [stepModal, setStepModal] = useState(1);
    const [changeData, setChangeData] = useState(false);


    const [TourLogic, setTourLogic] = useState(null)

    useEffect(() => {
        new TourLogic.getData().then((data) => {
            setTourLogic(data);
        })
    }, [])
    function isOpened(event) {
        showModal ? setShowModal(false) : setShowModal(true);
        showModal && setStepModal(1);
        event?.stepOpen && setStepModal(event.stepOpen);
        setChangeData(false);
    }

    function nextStep(event) {
        event?.stepOpen ? setStepModal(event?.stepOpen) : setStepModal(stepModal + 1);
        setChangeData(false);

    }

    function prevStep() {
        setStepModal(stepModal - 1);
        setChangeData(false);
    }

    function changeTime() {
        setChangeData(true);
    }

    const [phoneNumbers, setPhoneNumbers] = useState(null);
    const [tours, setTours] = useState(null);

    useEffect(() => {
        getCountryPhone().then((data) => setPhoneNumbers(data));
        getTours().then((data) => setTours(data));
    }, [])


    const getPropsStepModal = (step) => {
        const modalDefaultStepProps = {
            size: "default",
            title: "London Tour Calendar",
            nextStep,
            prevStep,
            isOpened,
        }

        const propsModalStep = {
            1: {},
            2: {size: 'small'},
            3: {size: 'large', allPhoneNumbers: phoneNumbers}
        }
        return {...modalDefaultStepProps, ...propsModalStep[step]}
    }

    const Step = STEP_MODAL[stepModal];


    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <button onClick={() => tourLogic.next()}>next departure</button>
                    <div className="calendar_wrap">
                        <h2 className="title">Tour Calendar</h2>
                        <div className="wrap-box">
                            <div className="wrap-button">
                                {phoneNumbers === <Loader/> ? 'loader' :
                                    <Button onClick={isOpened}>
                                        <div className="calendar_icon"><CalendarSvg/></div>
                                        <span>Pick a Date</span>
                                    </Button>
                                }
                            </div>
                            {tours === null ? <TabsLanguages loading={true}/> : <TabsLanguages/> }
                            <div className="how_many">
                                <div className="block_title">
                                    How many people are coming?
                                </div>
                                <CounterNumbers startNumber={1}/>
                            </div>
                            <div className="logo-calendar">
                                <CalendarLogo/>
                            </div>

                            <div className="days_wrap active">
                                {tours === null ?
                                    <LanguageLoader/>
                                    :
                                    <>
                                        <div className="day_name">Tomorrow, 01 December</div>
                                        <TourItem isOpened={isOpened}/>
                                        <TourItem isOpened={isOpened}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <Faqs/>
                </div>
            </div>
            <ModalBooking
                ModalShow={showModal}
                isOpened={isOpened}
                nextStep={nextStep}
                prevStep={prevStep}
                changeTime={changeTime}
                changeData={changeData}
                allPhoneNumbers={phoneNumbers}
                tours={tours}
            >
                {<Step {...getPropsStepModal(stepModal)}></Step>}
            </ModalBooking>

        </section>

    )
}
