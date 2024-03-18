'use client'
import { observer } from "mobx-react-lite";
import {useEffect, useState} from "react";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import {useContext} from "react";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import Calendar from "@/entities/calendar/ui/items";
import ModalListDepartures from "@/entities/checkout/ui/calendar/modal-list-departures";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {toJS} from "mobx";
import "@/entities/calendar/ui/modal-booking/step-1/style.css";

export default observer(function ChooseDate({ i18n }) {
    const {
        checkoutInfo: { tourName },
        managerModal: {chooseDateModal},
        editDeparture: {
            changePeopleNumber,
            numberPeople,
            departures,
            changeMonthAndYearn,
            setSelectedDay,
            toggleModalDepartureList,
            openModalDepartureList
        }
    } = useContext(CheckoutStoreContext);

    return (
        <div className={`step-1 `}>
            <div className="title">
                <div className="title_text" dangerouslySetInnerHTML={{__html: `${tourName} ${i18n.lower_change_data_time_number_people}`}}></div>
            </div>
            <div className="how-many">
                <div className="block-title">{i18n.how_many_people_are_coming}</div>
                <CounterNumbers startNumber={numberPeople} onChange={changePeopleNumber} />
            </div>
            <Calendar
                i18n={{
                    days: i18n.days,
                    months: i18n?.genitive?.months ?? {}
                }}
                onChange={(e) => setSelectedDay(e.fullDate)}
                departures={toJS(departures)}
                changeDate={changeMonthAndYearn}
            />
            <ModalBooking halfOpacity={chooseDateModal} show={openModalDepartureList} size={'step-2'} close={() => toggleModalDepartureList(false)}>
                <ModalListDepartures i18n={i18n} isOpened={openModalDepartureList} close={() => toggleModalDepartureList(false)}/>
            </ModalBooking>
        </div>
    );
});
