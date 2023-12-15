import CounterNumbers from '../../counter-numbers';
import Calendar from '../../calendar';
import CloseSvg from '@/assets/images/svg/close-svg';


import './style.css';



export default function Step1({nextStep , title , modalOpen , size}) {
    return (
        <div className={`step-1 ${size}`}>
            <div className="title">
                    <div className="title_text">
                        {title} 
                        change date/time/number of people
                    </div>
                    <div className="close-button" onClick={modalOpen}><CloseSvg /></div>
                </div>
            <div className="how-many">
                <div className="block-title">How many people are coming?</div>
                <CounterNumbers startNumber={1}/>
            </div>
            <Calendar nextStep={nextStep}/>
        </div>
  )
}
