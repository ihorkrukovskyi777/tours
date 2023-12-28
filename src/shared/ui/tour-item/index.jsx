//import Image from 'next/image';
import ClockSvg from '@/assets/images/svg/clock-svg';
import EnSvg from '@/assets/images/languages/en-svg';
import './style.css';


export default function TourItem({title , duration , language , time , onClick, id}) {
   return(
       <div className="tours_wrap" onClick={() => onClick(id)}>
           <div className="tour_block">
               <div className="top_part">
                   <div className="tour_name">{title}</div>
                   <div className="tour_hour">{time}</div>
               </div>
               <div className="bottom_part">
                   <div className="tour_duration">
                       <div className="clock_wrap">
                           <ClockSvg/>
                       </div>
                       <span>{duration} Hour</span>
                   </div>
                   <div className="tour_language">
                       <EnSvg/>
                   </div>
               </div>
           </div>
       </div>
   )
}

