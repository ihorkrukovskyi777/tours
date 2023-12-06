import TabsLanguages from '../../tabs-languages';
import CounterNumbers from '../../counter-numbers';
import Calendar from '../../calendar';
import CloseSvg from '@/assets/images/svg/close-svg';


import './style.css';



export default function Step1({nextStep , title , isOpened , size}) {
    return (
        <div className={`step-1 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={() => isOpened()}><CloseSvg /></div>
            </div>
            <TabsLanguages />
            <div className="how-many">
                <div className="block-title">How many people are coming?</div>
                <CounterNumbers startNumber={1}/>
            </div>
            <Calendar nextStep={nextStep}/>
        </div>
  )
}
