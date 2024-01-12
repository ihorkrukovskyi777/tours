'use client';
import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import OpenModalButton from "@/entities/calendar/ui/open-modal-button";
import DeparturesList from "@/entities/calendar/ui/departures-list";
import TabsLanguages from "@/shared/ui/tabs-languages";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import Step3 from '@/entities/calendar/ui/modal-booking/step-3/index'
import CounterNumbers from "@/shared/ui/counter-numbers";

import {StoreCalendarContext} from "@/entities/calendar/calendar-provider";
import {ServiceDate} from "@/shared/service/service-date";



export default observer(function Main({ siteLocale }) {

    const {
        storePhone: {
            phones,
            fetchPhones
        },
        storeCalendar: {
            activeLanguage,
            locale, loading, changeLanguage,
            storeDepLogic: {
                people, changePeople, isEmpty,
            },
            storeModalBooking: {
                isOpened,
                close,
                departure,
            },
            storeModalCalendar,
            fetchDepartures
        },
    } = useContext(StoreCalendarContext);

    useEffect(() => {
        fetchDepartures();
        fetchPhones();
    }, [])


    const changeModalBooking = () => {
        close()
        if(!storeModalCalendar.isOpened) {
            storeModalCalendar.open();
        }
    }



    return (
        <div className="calendar_wrap">
            <h2 className="title">Tour Calendar</h2>
            <div className="wrap-box">
                <div className="wrap-button">
                    {phones.state !== 'fulfilled' ?
                        null :
                        <OpenModalButton storeModalCalendar={storeModalCalendar}/>}
                </div>
                {!isEmpty ?
                <TabsLanguages
                    selectedCode={locale}
                    activeLanguage={activeLanguage}
                    loading={loading.isLoad}
                    onChange={changeLanguage}
                /> : null }
                <div className="how_many">
                    {!isEmpty ?
                        <>
                            <div className="block_title">
                                How many people are coming?
                            </div>
                            <CounterNumbers startNumber={people} onChange={changePeople}/></>
                        : null
                    }
                </div>
                <DeparturesList />
            </div>
            <ModalBooking show={isOpened}>
                <Step3
                    people={people}
                    locale={siteLocale}
                    onChange={changeModalBooking}
                    allPhoneNumbers={phones.value}
                    isOpened={isOpened}
                    departure={departure}
                    language={locale}
                    close={close}
                />
            </ModalBooking>
        </div>

    )
})
