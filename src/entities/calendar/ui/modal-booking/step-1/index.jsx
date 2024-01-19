
import {observer} from "mobx-react-lite";
import TabsLanguages from 'src/entities/calendar/ui/tabs-languages';
import CounterNumbers from 'src/shared/ui/selectors/counter-numbers';
import Calendar from 'src/entities/calendar/ui/items';
import CloseSvg from '@/assets/images/svg/close-svg';
import Loader from "@/shared/ui/loaders/default-loader";
import useEscHooks from "@/shared/hooks/use-esc-event";

import './style.css';
export default observer(function Step1({storeModalCalendar, title, size = 'large', onChange = () => {}, isEsc}) {
    const {
        close,
        loading,
        changeLanguage,
        departures,
        changeMonthAndYearn,
        activeLanguage,
        storeDepLogic : { people, changePeople, locale }
    } = storeModalCalendar

    useEscHooks(close, isEsc)
    const closeModal = (e) => {
        e.stopPropagation();
        close();
    }
    return (
        <div className={`step-1 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={closeModal}><CloseSvg/></div>
            </div>
            <TabsLanguages
                selectedCode={locale}
                loading={loading.isLoad}
                activeLanguage={activeLanguage}
                onChange={changeLanguage}
            />

            <div className="how-many">
                <div className="block-title">How many people are coming?</div>
                <CounterNumbers startNumber={people} onChange={changePeople}/>
            </div>
             <Calendar
                 onChange={onChange}
                 departures={departures}
                 changeDate={changeMonthAndYearn}
             >
                 {loading.isLoad ? <Loader style={{opacity: '0.5'}}/> : null  }
             </Calendar>
        </div>
    )
})
