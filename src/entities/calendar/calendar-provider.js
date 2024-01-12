'use client'
import {createContext, memo} from "react";
import {StoreCalendar} from "@/entities/calendar/store/store-calendar";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import Faqs from "@/widgets/faqs/faqs";
import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";

import '@/entities/calendar/ui/main/style.css';

const Main = dynamic(
    () => import("@/entities/calendar/ui/main/main"),
    {
        ssr: false,
        loading: () => <div className="calendar_wrap" style={{position: 'relative', minHeight: '300px'}}><Loader style={{backgroundColor: 'inherit'}}/></div>
    }
)

export const StoreCalendarContext = createContext(null)

export default memo(async function CalendarProvider({locale, type, id, activeLanguage}) {
    return (
        <StoreCalendarContext.Provider value={{
            storeCalendar: new StoreCalendar(locale, type, id, activeLanguage),
            storePhone: new StorePhone(locale)
        }}>
            <section id="tour_calendar_section" className="tour_calendar">
                <div className="container">
                    <div className="wrapper">
                        <Main siteLocale={locale}/>
                        <Faqs/>
                    </div>
                </div>
            </section>
        </StoreCalendarContext.Provider>
    )
})
