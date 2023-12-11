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
import { useState , useEffect } from "react"; 
import { getCountryPhone } from '@/entities/api/getCountryPhone';
import { getTours } from "@/entities/api/getTours";
import CalendarLogo from "@/assets/images/svg/calendar-logo";


import './style.css';

export default function TourCalendar() {

const [showmodal , setShowmodal] = useState(false);
const [stepModal , setStepModal] = useState(1);
const [changeData , setChangeData] = useState(false);


function isOpened(event) {
   showmodal ? setShowmodal(false)  : setShowmodal(true);
   showmodal && setStepModal(1);
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

const [phoneNumbers , setPhoneNumbers] = useState(null);
const [tours , setTours] = useState(null);

useEffect(() => {
   getCountryPhone().then( (data) => setPhoneNumbers(data));
   getTours().then( (data) => setTours(data));
},[])


console.log(tours , 'tours');





  return (
    <section id="tour_calendar_section" className="tour_calendar">
        <div className="container">
            <div className="wrapper">
                <h2 className="title">Tour Calendar</h2>
                <div className="wrap-box">
                    <Button onClick={isOpened}>
                        <div className="calendar_icon"><CalendarSvg/></div>
                        <span>Pick a Date</span>
                    </Button>

                    <TabsLanguages/>
                    
                    <div className="how_many">
                        <div className="block_title">How many people are coming?</div>
                        <CounterNumbers startNumber={1}/>
                    </div>
                    <div className="logo-calendar"><CalendarLogo/></div>

                    <div className="days_wrap active">
                        <div className="day_name">Tomorrow, 01 December</div>
                        <TourItem isOpened={isOpened} />
                        <TourItem isOpened={isOpened} />
                    </div>

                </div>
            </div>                        
        </div>
        <ModalBooking ModalShow={showmodal} isOpened={isOpened} nextStep={nextStep} prevStep={prevStep} changeTime={changeTime} changeData={changeData} allPhoneNumbers={phoneNumbers} tours={tours} >
            {stepModal === 1 || changeData ? <Step1 size="default" title="London Tour Calendar" nextStep={nextStep} prevStep={prevStep} isOpened={isOpened} /> : null}
            {stepModal === 2 && <Step2 size="small" title="London Tour Calendar" nextStep={nextStep} prevStep={prevStep} isOpened={isOpened} />}
            {stepModal === 3 && <Step3 size="large" title="London Tour Calendar" prevStep={prevStep} changeTime={changeTime} isOpened={isOpened} allPhoneNumbers={phoneNumbers}  />}
        </ModalBooking>





    </section>
    
  )
}
