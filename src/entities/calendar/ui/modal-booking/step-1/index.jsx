import TabsLanguages from '../../../../../shared/ui/tabs-languages';
import CounterNumbers from '../../../../../shared/ui/counter-numbers';
import Calendar from '../../../../../shared/ui/calendar';
import CloseSvg from '@/assets/images/svg/close-svg';


import './style.css';



export default function Step1({nextStep , title , isOpened , size, langTour, serviceTour}) {
    return (
        <div className={`step-1 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={() => isOpened()}><CloseSvg /></div>
            </div>
            <TabsLanguages selectedCode={langTour}/>
            <div className="how-many">
                <div className="block-title">How many people are coming?</div>
                <CounterNumbers startNumber={1}/>
            </div>
            <Calendar nextStep={nextStep} serviceTour={serviceTour}/>
        </div>
  )
}
