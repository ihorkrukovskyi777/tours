"use client";
import {createContext, memo, useEffect} from "react";
import {StoreCalendar} from "@/entities/calendar/store/store-calendar";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import Main from "@/entities/calendar/ui/main/main";
import "@/entities/calendar/ui/main/style.css";

export const StoreCalendarContext = createContext(null);

export default memo(function CalendarProvider({
                                                  i18n,
                                                  title,
                                                  locale,
                                                  type,
                                                  id,
                                                  activeLanguage,
                                                  nameDayWeek,
                                                  isMobile = false,
                                                  titleCalendar,
                                              }) {





    useEffect(() => {
        const section = document.getElementById('tour_calendar_section');
        if(section && !findLocale) {
            section.style.display = 'none';
        }
    }, [])

    if(!Array.isArray(activeLanguage)) {
        return null;
    }

    let findLocale = activeLanguage?.find((item) => item.code === locale);
    if (!findLocale) {
        [findLocale] = activeLanguage;
    }

    if (!findLocale) {

        return null;
    }

    return (
        <StoreCalendarContext.Provider
            value={{
                storeCalendar: new StoreCalendar(
                    findLocale.code,
                    type,
                    id,
                    activeLanguage,
                    title,
                    locale,
                ),
                storePhone: new StorePhone(locale),
            }}
        >
            <Main siteLocale={locale} i18n={i18n} nameDayWeek={nameDayWeek} isMobile={isMobile} title={title} titleCalendar={titleCalendar}/>
        </StoreCalendarContext.Provider>
    );
});
