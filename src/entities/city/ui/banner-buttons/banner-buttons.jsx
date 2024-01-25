'use client'

import Button from "@/shared/ui/selectors/button/button";
import CalendarWhite from "/public/images/svg/calendar-white.svg"

export default function BannerButtons() {
    function scrollToCalendar() {
        const section = document.querySelector('#tour_calendar_section');
        if (section) section.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    return (
       <>
           <Button onClick={scrollToCalendar}>Today</Button>
           <Button onClick={scrollToCalendar}>Tomorrow</Button>
           <Button customClass="calendar-btn" onClick={scrollToCalendar} icon={CalendarWhite}></Button>
       </>
    )
}
