import {observer} from "mobx-react-lite";
import TabsLanguages from "@/entities/calendar/ui/tabs-languages";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import Calendar from "@/entities/calendar/ui/items";
import CloseSvg from "@/assets/images/svg/close-svg";
import Loader from "@/shared/ui/loaders/default-loader";
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useTranslation} from "@/i18n/client";
import "./style.css";

export default observer(function Step1({
                                           i18n,
                                           storeModalCalendar,
                                           title = "",
                                           size = "default",
                                           onChange = () => {
                                           },
                                           isEsc,
                                       }) {
    const {
        close,
        loading,
        changeLanguage,
        departures,
        changeMonthAndYearn,
        activeLanguage,
        storeDepLogic: {people, changePeople, locale},
    } = storeModalCalendar;

    const {t} = useTranslation()
    useEscHooks(close, isEsc);
    const closeModal = (e) => {
        e.stopPropagation();
        close();
    };
    return (
        <div className={`step-1 ${size}`}>
            <div className="title">
                <div className="title_text">{title}</div>
                <div className="close-button" onClick={closeModal}>
                    <CloseSvg/>
                </div>
            </div>
            <TabsLanguages
                selectedCode={locale}
                loading={loading.isLoad}
                activeLanguage={activeLanguage}
                onChange={changeLanguage}
            />

            <div className="how-many">
                <div className="block-title">{i18n.how_a_many_people}</div>
                <CounterNumbers startNumber={people} onChange={changePeople}/>
            </div>
            <Calendar
                i18n={{ months: i18n.months }}
                onChange={onChange}
                departures={departures}
                changeDate={changeMonthAndYearn}
            >
                {loading.isLoad ? <Loader style={{opacity: "0.5"}}/> : null}
            </Calendar>
        </div>
    );
});
