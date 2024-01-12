'use client';
import {Fragment, useRef} from "react";
import Button from "../../shared/ui/button/button";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import CalendarSvg from '@/assets/images/svg/calendar-svg'
import CounterNumbers from "@/shared/ui/counter-numbers";
import TabsLanguages from "@/shared/ui/tabs-languages";
import TourItem from "@/shared/ui/tour-item";
import Step1 from "src/entities/calendar/ui/modal-booking/step-1";
import Step2 from "src/entities/calendar/ui/modal-booking/step-2";
import Step3 from "src/entities/calendar/ui/modal-booking/step-3";
import {useState, useEffect} from "react";
import {getCountryPhone} from '@/shared/api/getCountryPhone';
import CalendarLogo from "@/assets/images/svg/calendar-logo";
import Loader from "src/shared/ui/loaders/default-loader";
import Faqs from "../faqs/faqs";
import LanguageLoader from "@/shared/ui/loaders/language-loader";
import TourLogic from "@/entities/calendar/service/tour-logic";

import {isTomorrowOrToday} from "@/shared/hepers/date";
import './style.css';

const STEP_MODAL = {
    1: Step1,
    2: Step2,
    3: Step3,
}

const INIT_DEPARTURES = {
    done: false,
    value: [],
}
export default function TourCalendar({locale, type, id}) {
    const [showModal, setShowModal] = useState(false);
    const [stepModal, setStepModal] = useState(1);
    const [changeData, setChangeData] = useState(false);

    const [departures, setDepartures] = useState(INIT_DEPARTURES);
    const [langTour, setLangTour] = useState(locale)

    const serviceTour = useRef(new TourLogic(id, langTour, locale, type));
    const [paginationDeparture, setPaginationDepartures] = useState(null)


    const [loading, setLoading] = useState(true);

    const [selectedDeparture, setSelectedDeparture] = useState(null);
    useEffect(() => {
        changeLanguageCalendar(locale).then()
    }, [serviceTour, locale])

    const changeLanguageCalendar = async (code) => {
        setLoading(true);
        setLangTour(code);
        serviceTour.current.updateCurrentLang(code);
        const data = await serviceTour.current.getData();
        setDepartures(INIT_DEPARTURES)
        setPaginationDepartures(data.getDataMonth());
        setLoading(false);
    }

    useEffect(() => {
        if (paginationDeparture) {
            nextPage()
        }
    }, [paginationDeparture])

    const departuresCopy = useRef([]);


    const nextPage = () => {
        const pagination = paginationDeparture.next();
        departuresCopy.current = [...departuresCopy.current, ...Object.values(pagination.value).flat()];
        let spliceIndex = 10;
        if (departures.value?.length === 0) {
            const findIndex = departuresCopy.current.findIndex(item => {
                if (isTomorrowOrToday(item.date, 0)) {
                    return false
                } else if (isTomorrowOrToday(item.date, 1)) {
                    return false;
                }
                return true;
            })
            spliceIndex = findIndex < 5 ? 5 : findIndex;
            spliceIndex = findIndex > 30 ? 30 : findIndex;
        }
        setDepartures({
            value: [...departures.value, ...departuresCopy.current.splice(0, spliceIndex)],
            done: pagination.done
        });
    }


    function isOpened(event) {
        showModal ? setShowModal(false) : setShowModal(true);
        showModal && setStepModal(1);
        event?.stepOpen && setStepModal(3);
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

    useEffect(() => {
        getCountryPhone(locale).then((data) => setPhoneNumbers(data));
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
            1: {langTour, serviceTour: serviceTour.current},
            2: {size: 'small'},
            3: {size: 'large', allPhoneNumbers: phoneNumbers, selectedDeparture}
        }
        return {...modalDefaultStepProps, ...propsModalStep[step]}
    }

    const Step = STEP_MODAL[stepModal];
    const showNewDay = {};
    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
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
                            <TabsLanguages onChange={changeLanguageCalendar} loading={loading} selectedCode={locale}/>
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
                                {loading ?
                                    <LanguageLoader/>
                                    :
                                    <>
                                        {departures.value.map(departure => {
                                            const date = departure.date;
                                            const showDate = !showNewDay[date];
                                            showNewDay[date] = true;
                                            return (
                                                <Fragment key={departure.depId}>
                                                    {showDate ? <div
                                                        className="day_name">{serviceTour.current.getDaysName[date]}</div> : null}
                                                    <TourItem onClick={() => {
                                                        setSelectedDeparture(departure)
                                                        setStepModal(3)
                                                        setShowModal(true);
                                                    }}/>
                                                </Fragment>
                                            )
                                        })}
                                    </>
                                }
                                {departures.done || loading ? null : <button onClick={nextPage}>Show Me More</button>}
                            </div>
                        </div>
                    </div>
                    <Faqs/>
                </div>
            </div>
            {stepModal} - stepModal
            {loading ? null : <ModalBooking
                ModalShow={showModal}
                nextStep={nextStep}
                prevStep={prevStep}
                changeTime={changeTime}
                changeData={changeData}
                allPhoneNumbers={phoneNumbers}
            >
                {<Step {...getPropsStepModal(stepModal)}></Step>}
            </ModalBooking>}

        </section>
    )
}
