import { observer } from "mobx-react-lite";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import CloseSvg from "@/assets/images/svg/close-svg";
import {useTranslation} from "@/i18n/client";
import "@/entities/calendar/ui/modal-booking/step-1/style.css";
import {useContext} from "react";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import Calendar from "@/entities/calendar/ui/items";
import ModalListDepartures from "@/entities/checkout/ui/calendar/modal-list-departures";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {toJS} from "mobx";
export default observer(function ChooseDate() {
    const {checkoutInfo: { tourName }, editDeparture: { changePeopleNumber, numberPeople, departures, changeMonthAndYearn,  setSelectedDay, selectedDay, resetSelectedDay }} = useContext(CheckoutStoreContext);

    const { t } = useTranslation()

    return (
        <div className={`step-1 `}>
            <div className="title">
                {selectedDay}
                <div className="title_text">{tourName} {t('change date/time/number of people')}</div>
            </div>
            <div className="how-many">
                <div className="block-title">{t('How many people are coming?')}</div>
                <CounterNumbers startNumber={numberPeople} onChange={changePeopleNumber} />
            </div>
            <Calendar
                onChange={(e) => setSelectedDay(e.fullDate)}
                departures={toJS(departures)}
                changeDate={changeMonthAndYearn}
            />
            <ModalBooking show={!!selectedDay} size={'step-2'} close={resetSelectedDay}>
                <ModalListDepartures isOpened={!!selectedDay} close={resetSelectedDay}/>
            </ModalBooking>
        </div>
    );
});
