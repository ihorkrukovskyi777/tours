'use client';
import {useContext, useEffect, useState} from "react";
import Loader from "@/shared/ui/loaders/default-loader";
import {observer} from "mobx-react-lite";
import dynamic from "next/dynamic";
import TabsLanguages from "@/entities/calendar/ui/tabs-languages";
import ModalBooking from "@/entities/calendar/ui/modal-booking";
import {StoreCalendarContext} from "@/entities/calendar/calendar-provider";
import DeparturesList from "@/entities/calendar/ui/departures-list";
import CounterNumbers from "@/shared/ui/selectors/counter-numbers";
const Step3 = dynamic(
    () => import("@/entities/calendar/ui/modal-booking/step-3/index"),
    {
        ssr: false,
        loading: () => <div style={{position: 'relative'}}><Loader/></div>
    }
)
const OpenModalButton = dynamic(
    () => import("@/entities/calendar/ui/open-modal-button"),
    {
        ssr: false,
    }
)
export default observer(function Main({siteLocale, i18n, nameDayWeek = false, isMobile = false}) {

    const [eventLoadingModal, setEventLoadingModal] = useState(false);


    useEffect(() => {
        const load = () => {
            window.removeEventListener('click', load)
            window.removeEventListener('touchstart', load)
            window.removeEventListener('mousemove', load)
            window.removeEventListener('touchmove', load)
            window.removeEventListener('scroll', load)
            setEventLoadingModal(true)

        };
        window.addEventListener('click', load)
        window.addEventListener('touchstart', load)
        window.addEventListener('touchmove', load)
        window.addEventListener('mousemove', load)
        window.addEventListener('scroll', load)

        return () => {
            window.removeEventListener('click', load)
            window.removeEventListener('touchstart', load)
            window.removeEventListener('mousemove', load)
            window.removeEventListener('touchmove', load)
            window.removeEventListener('scroll', load)
        }
    }, [])
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
                errors,
                fetchBookingDeparture,
                isOpened,
                close,
                loadingBooking,
                departure,
                selectedLocale,
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
        <div className="calendar_wrap" style={{minHeight: '400px'}}>
            <h2 className="title">{i18n.tour_calendar}</h2>
            <div className="wrap-box">
                <div className="wrap-button">
                    {phones.state !== 'fulfilled' ?
                        null :
                        <OpenModalButton
                            nameDayWeek={nameDayWeek}
                            storeModalCalendar={storeModalCalendar}
                            eventLoadingModal={eventLoadingModal}
                            i18n={{
                                departure_available: i18n.departure_available,
                                how_a_many_people: i18n.how_a_many_people,
                                pick_a_date: i18n.pick_a_date,
                                genitive_months: i18n?.genitive?.months ?? {},
                                months: i18n?.months ?? {},
                                days: i18n?.days,
                                save_changes: i18n.save_changes,
                                back: i18n.back,
                                hours: i18n.hours,
                                hour: i18n.hour,
                                see_all: i18n.see_all,
                            }}
                        />}
                </div>
                <TabsLanguages
                    i18n={{see_all: i18n.see_all}}
                    selectedCode={locale}
                    activeLanguage={activeLanguage}
                    loading={loading.isLoad}
                    onChange={changeLanguage}
                />
                <div className="how_many">
                    {!isEmpty ?
                        <>
                            <div className="block_title">
                                {i18n.how_a_many_people}
                            </div>
                            <CounterNumbers startNumber={people} onChange={changePeople}/></>
                        : null
                    }
                </div>
                {loading && (eventLoadingModal || !isMobile) ?
                    <DeparturesList
                        nameDayWeek={nameDayWeek}
                        i18n={{
                            months: i18n.months,
                            days: i18n.days,
                            hours: i18n.hours,
                            hour: i18n.hour,
                            show_me_more: i18n.show_me_more,
                            departures_not_found: i18n.departures_not_found
                        }}
                    />
                    : null}
            </div>
            {eventLoadingModal ?
                <ModalBooking size={'step-3'} show={isOpened} halfOpacity={storeModalCalendar.isOpenedListDeparture} close={close}>
                    <Step3
                        i18n={i18n}
                        langSelected={locale}
                        errors={errors}
                        people={people}
                        locale={siteLocale}
                        nameDayWeek={nameDayWeek}
                        selectedLocale={selectedLocale}
                        fetchBookingDeparture={fetchBookingDeparture}
                        size="large"
                        onChange={changeModalBooking}
                        allPhoneNumbers={phones.value}
                        isOpened={isOpened}
                        departure={departure}
                        language={locale}
                        isLoading={loadingBooking}
                        close={close}
                    />
                </ModalBooking> : null}

        </div>
    )
})
