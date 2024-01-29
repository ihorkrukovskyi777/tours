"use client";
import {createContext, memo} from "react";
import {StoreCalendar} from "@/entities/calendar/store/store-calendar";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import Main from "@/entities/calendar/ui/main/main";
import "@/entities/calendar/ui/main/style.css";



export const StoreCalendarContext = createContext(null);

export default memo(function CalendarProvider({
                                                  title,
                                                  locale,
                                                  type,
                                                  id,
                                                  activeLanguage,
                                              }) {


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
                ),
                storePhone: new StorePhone(findLocale.code),
            }}
        >
            <Main siteLocale={locale}/>
        </StoreCalendarContext.Provider>
    );
});
