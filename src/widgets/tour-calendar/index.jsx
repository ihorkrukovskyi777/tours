import Button from "../../shared/ui/button/button";
import EnSVG from '@/assets/images/languages/en-svg'
import CalendarSvg from '@/assets/images/svg/calendar-svg'
import CounterNumners from "@/shared/ui/counter-numbers";
import TabsLanguages from "@/shared/ui/tabs-languages";


import './style.css';
export default function TourCalendar() {
  return (
    <section id="tour_calendar_section" className="tour_calendar">
        <div className="container">
            <div className="wrapper">
                <h2 className="title">Tour Calendar</h2>
                <div className="wrap-box">
                    <Button>
                        <div className="calendar_icon"><CalendarSvg/></div>
                        <span>Pick a Date</span>
                    </Button>


                    <TabsLanguages/>
                    
                    <div className="how_many">
                        <div className="block_title">How many people are coming?</div>
                        <CounterNumners startNumber={1}/>
                    </div>


                    <div className="logo-calendar">
                    svg
                    </div>

                    <div className="days_wrap ">
                        <div className="day_name">Today, 28 November</div>
                        <div className="tours_wrap">
                            <div className="tour_block">
                                <div className="top_part">
                                    <div className="tour_name">Free Graffiti Tour Bogota</div>
                                    <div className="tour_hour">10:00</div>
                                </div>
                                <div className="bottom_part">
                                    <div className="tour_duration">
                                        <div className="clock_wrap">
                                            <EnSVG/>
                                            <span>2:30 Hour</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>                        
        </div>   

    </section>
    
  )
}
