'use client';
import {useContext, useEffect} from "react";
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
        loading: () => <div style={{position: 'relative'}}><Loader/></div>
    }
)
const OpenModalButton = dynamic(
    () => import("@/entities/calendar/ui/open-modal-button"),
    {
        ssr: false,
    }
)
export default observer(function Main({siteLocale, i18n}) {
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
                            storeModalCalendar={storeModalCalendar}
                            i18n={{
                                departure_available: i18n.departure_available,
                                how_a_many_people: i18n.how_a_many_people,
                                pick_a_date: i18n.pick_a_date,
                                months: i18n.months,
                                days: i18n.days,
                                save_changes: i18n.save_changes,
                                back: i18n.back,
                                hours: i18n.hours,
                            }}
                        />}
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
                                {i18n.how_a_many_people}
                            </div>
                            <CounterNumbers startNumber={people} onChange={changePeople}/></>
                        : null
                    }
                </div>
                {departures?.length ?
                    <DeparturesList
                        i18n={{
                            months: i18n.months,
                            days: i18n.days,
                            show_me_more: i18n.show_me_more,
                            departures_not_found: i18n.departures_not_found
                        }}
                    />
                    : null}
            </div>
            <ModalBooking size={'step-3'} show={isOpened}>
                {isOpened ? <Step3
                    i18n={i18n}
                    langSelected={locale}
                    errors={errors}
                    people={people}
                    locale={siteLocale}
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
                /> : null}
            </ModalBooking>
        </div>

    )
})
