'use client'

import Button from "@/shared/ui/button/button";
import CalendarSvg from "@/assets/images/svg/calendar_white.svg";

export default function BannerButtons() {
    function scrollToCalendar() {
        const section = document.querySelector('#tour_calendar_section');
        if (section) section.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    return (
       <>
           <Button onClick={scrollToCalendar}>Today</Button>
           <Button onClick={scrollToCalendar}>Tomorrrow</Button>
           <Button onClick={scrollToCalendar} icon={CalendarSvg}></Button>
       </>
    )
}
