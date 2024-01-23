'use client'
import {createContext, memo} from "react";
import {StoreCalendar} from "@/entities/calendar/store/store-calendar";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import Faqs from "@/shared/ui/faqs/faqs";
import Main from "@/entities/calendar/ui/main/main";
import '@/entities/calendar/ui/main/style.css';
export const StoreCalendarContext = createContext(null)

export default async function CalendarProvider({locale, type, id, activeLanguage, questions, hydration, phones}) {
    console.log('CalendarProvider')
    let findLocale = activeLanguage?.find(item => item.code === locale);
    if(!findLocale) {
        [findLocale] = activeLanguage
    }
    if(!findLocale) {
        return null
    }

    return (
        <StoreCalendarContext.Provider value={{
            storeCalendar: new StoreCalendar(findLocale.code, type, id, activeLanguage, hydration),
            storePhone: new StorePhone(findLocale.code, phones)
        }}>
            <section id="tour_calendar_section" className="tour_calendar">
                <div className="container">
                    <div className="wrapper">
                        <Main siteLocale={locale}/>
                        <Faqs questions={questions}/>
                    </div>
                </div>
            </section>
        </StoreCalendarContext.Provider>
    )
}
