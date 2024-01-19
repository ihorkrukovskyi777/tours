'use client'

import Button from "@/shared/ui/selectors/button/button";
import CalendarSvg from "@/assets/images/svg/calendar_white.svg";

export default function BannerButtons() {
    function scrollToCalendar() {
        const section = document.querySelector('#tour_calendar_section');
        if (section) section.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    return (
       <>
           <Button onClick={scrollToCalendar}>Today</Button>
           <Button onClick={scrollToCalendar}>Tomorrow</Button>
           <Button customClass="calendar-btn" onClick={scrollToCalendar} icon={CalendarSvg}></Button>
       </>
    )
}
