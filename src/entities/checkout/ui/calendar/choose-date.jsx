import { observer } from "mobx-react-lite";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import CloseSvg from "@/assets/images/svg/close-svg";
import {useContext} from "react";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import Calendar from "@/entities/calendar/ui/items";
import ModalListDepartures from "@/entities/checkout/ui/calendar/modal-list-departures";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {toJS} from "mobx";
import "@/entities/calendar/ui/modal-booking/step-1/style.css";

export default observer(function ChooseDate({ i18n }) {
    const {checkoutInfo: { tourName }, editDeparture: { changePeopleNumber, numberPeople, departures, changeMonthAndYearn,  setSelectedDay, selectedDay, resetSelectedDay }} = useContext(CheckoutStoreContext);
    console.log(i18n, 'i18n')

    return (
        <div className={`step-1 `}>
            <div className="title">
                {selectedDay}
                <div className="title_text">{tourName} {i18n.change_data_time_number_people}</div>
            </div>
            <div className="how-many">
                <div className="block-title">{i18n.how_many_people_are_coming}</div>
                <CounterNumbers startNumber={numberPeople} onChange={changePeopleNumber} />
            </div>
            <Calendar
                i18n={{
                    days: i18n.days,
                    months: i18n.months
                }}
                onChange={(e) => setSelectedDay(e.fullDate)}
                departures={toJS(departures)}
                changeDate={changeMonthAndYearn}
            />
            <ModalBooking show={!!selectedDay} size={'step-2'} close={resetSelectedDay}>
                <ModalListDepartures i18n={i18n} isOpened={!!selectedDay} close={resetSelectedDay}/>
            </ModalBooking>
        </div>
    );
});
