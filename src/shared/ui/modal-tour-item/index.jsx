import ClockSvg from '@/assets/images/svg/clock-svg';
import classNames from 'classnames';
import './style.css';


export default function ModalTourItem({title , hour , language , timeTour , nextStep , isActive}) {
   return(
    <div className={classNames('modal-tour-item' , {'active': isActive})} onClick={nextStep}>
        <h5>Free Harry Potter Tour London</h5>
        <div className="tour-item__time">
            <div className="start-time">00:00</div>
            <div className="duration">
                <div className="clock-wrap">
                    <ClockSvg/>
                </div>
                <span>1:00 Hour</span>
            </div>
        </div>
    </div>
   )
}
    
    