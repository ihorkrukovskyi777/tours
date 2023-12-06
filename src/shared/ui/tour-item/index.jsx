//import Image from 'next/image';
import ClockSvg from '@/assets/images/svg/clock-svg';
import EnSvg from '@/assets/images/languages/en-svg';
import './style.css';


export default function TourItem({title , hour , language , timeTour , isOpened}) {
   return(
    <div className="tours_wrap" onClick={()=> isOpened({stepOpen:3})}>
        <div className="tour_block">
            <div className="top_part">
                <div className="tour_name">Free Harry Potter Tour London</div>
                <div className="tour_hour">00:00</div>
            </div>
            <div className="bottom_part">
                <div className="tour_duration">
                    <div className="clock_wrap">
                        <ClockSvg/>
                    </div>
                    <span>1:00 Hour</span>
                </div>
                <div className="tour_language">
                    <EnSvg/>
                </div>
            </div>
        </div>
    </div>
   )
}
    
    