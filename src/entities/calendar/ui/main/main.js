'use client';
import {useContext, useEffect, memo} from "react";
import Loader from "@/shared/ui/loaders/default-loader";
import {observer} from "mobx-react-lite";
import dynamic from "next/dynamic";
import TabsLanguages from "@/entities/calendar/ui/tabs-languages";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {StoreCalendarContext} from "@/entities/calendar/calendar-provider";

const CounterNumbers = dynamic(
    () => import("@/shared/ui/selectors/counter-numbers"),
    {
        ssr: false,
    }
)
const DeparturesList = dynamic(
    () => import("@/entities/calendar/ui/departures-list"),
    {
        ssr: false,
    }
)
const Step3 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-3/index"),
    {
        ssr: false,
        loading: () => <div style={{position: 'relative'}}><Loader /></div>
    }
)
const OpenModalButton = dynamic(
    () => import("@/entities/calendar/ui/open-modal-button"),
    {
        ssr: false,
    }
)
export default observer(function Main({siteLocale}) {
    const {
        storePhone: {
            phones,
            fetchPhones
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
            fetchDepartures
        },
    } = useContext(StoreCalendarContext);

    useEffect(() => {
        fetchDepartures();
        fetchPhones();
    }, [])

    const changeModalBooking = () => {
        close()
        if (!storeModalCalendar.isOpened) {
            storeModalCalendar.open();
        }
    }

    return (
        <div className="calendar_wrap" style={{minHeight: '900px'}}>
            <h2 className="title">Tour Calendar</h2>
            <div className="wrap-box">
                <div className="wrap-button">
                    {phones.state !== 'fulfilled' ?
                        null :
                        <OpenModalButton storeModalCalendar={storeModalCalendar}/>}
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
                {departures?.length ? <DeparturesList/> : null}
            </div>
            <ModalBooking show={isOpened}>
                 <Step3
                    langSelected={locale}
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
