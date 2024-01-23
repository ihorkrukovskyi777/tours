'use client';
import {useContext, useEffect, memo} from "react";
import {observer} from "mobx-react-lite";
import dynamic from "next/dynamic";
import TabsLanguages from "@/entities/calendar/ui/tabs-languages";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {StoreCalendarContext} from "@/entities/calendar/calendar-provider";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
import DeparturesList from "@/entities/calendar/ui/departures-list";
import OpenModalButton from "@/entities/calendar/ui/open-modal-button";
const Step3 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-3/index"),
    {
        ssr: false,
    }
)

export default observer(function Main({siteLocale}) {
    const {
        storePhone: {
            phones,
        },
        storeCalendar: {
            activeLanguage,
            locale, loading, changeLanguage,
            departures,
            storeDepLogic: {
                people, changePeople, isEmpty,
            },
            storeModalBooking: {
                isOpened,
                close,
                departure,
            },
            storeModalCalendar,
        },
    } = useContext(StoreCalendarContext);



    const changeModalBooking = () => {
        close()
        if (!storeModalCalendar.isOpened) {
            storeModalCalendar.open();
        }
    }


    return (
        <div className="calendar_wrap" style={{minHeight: '300px'}}>
            <h2 className="title">Tour Calendar</h2>
            <div className="wrap-box">
                <div className="wrap-button">
                        <OpenModalButton storeModalCalendar={storeModalCalendar}/>
                </div>
                <TabsLanguages
                    selectedCode={locale}
                    activeLanguage={activeLanguage}
                    loading={loading.isLoad}
                    onChange={changeLanguage}
                />
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
                {departures?.length ? <DeparturesList/> : null }
            </div>
            <ModalBooking show={isOpened}>
                {isOpened ? <Step3
                    langSelected={locale}
                    people={people}
                    locale={siteLocale}
                    onChange={changeModalBooking}
                    allPhoneNumbers={phones.value}
                    isOpened={isOpened}
                    departure={departure}
                    language={locale}
                    close={close}
                /> : null}
            </ModalBooking>
        </div>

    )
})
