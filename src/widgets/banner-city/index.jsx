'use client';
import Banner from '@/shared/ui/banner';
import Button from '@/shared/ui/button/button';
import CalendarSvg from '@/assets/images/svg/calendar_white.svg';
import Reviews from '@/shared/ui/reviews/reviews';
import './style.css';

export default function BannerCity({title , size}) {
function scrollToCalendar() {
    const section = document.querySelector( '#tour_calendar_section');
    if(section) section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
};


  return (
    <Banner title={title} size={size} bottomView={<Reviews rating={2.3} count_reviews={130}/>}>
        <p className="pick_text">Pick a Date!</p>
        <div className="flex-row">
          <Button onClick={scrollToCalendar}>Today</Button>
          <Button onClick={scrollToCalendar}>Tomorrrow</Button>
          <Button onClick={scrollToCalendar} icon={CalendarSvg}></Button>
        </div>
    </Banner>
  )
}
