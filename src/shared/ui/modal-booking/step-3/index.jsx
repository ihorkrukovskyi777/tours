import Button from '../../button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import FullStarSvg from '@/assets/images/svg/full-star';
import FormCalendar from './form';

import './style.css';

export default function Step3({changeTime , isOpened , size , allPhoneNumbers}) {
    return ( 
        <div className={`step-3 ${size}`}>
            <div className="subtitle">
                <div className="subtitle-text">Your booking details. You're almost there!</div>
                <div className="close-button" onClick={() => isOpened()}><CloseSvg /></div>
            </div>

            <div className="title">
                <div className="title-intro">
                    <div className="subtitle-text subtitle-text-mobile">Your booking details. You're almost there!</div>
                    <div className="title-text">Free Sherlock Holmes Tour London</div>
                </div>
                <div className="guide">
                    <div className="photo-wrap">
                        image
                    </div>
                    <div className="guide-info">
                        <div className="guide-name">Dsf</div>
                        <div className="guide-rate">
                            <div className="icon-wrap">
                                <FullStarSvg width={20} height={20}/>
                            </div>
                            <span>4</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-change">
                <div className="flex-box">
                    <div className="item-data">
                        <div className="choosen-date">Tomorrow, 01 December</div>
                        <div className="time-current-modal">03:00</div>
                        <span>,</span>
                    </div>
                    <div className="append-wrap2">
                        <div className="tour-item step-next" id-tour="">
                            <div className="tour-item__time">
                                <div className="duration">
                                    <div className="clock-wrap">clock</div>
                                    <span>3:00 Hour</span>
                                </div>
                                <div className="people">
                                    <span className="comma">,</span>
                                    <span className="people-count">1</span>People
                                </div>
                                image
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-wrap">
                    <Button className="change" onClick={()=>changeTime()}>Change</Button>
                    
                </div>
            </div>

           <FormCalendar allPhoneNumbers={allPhoneNumbers}/>
            
           

        </div>
)
}




