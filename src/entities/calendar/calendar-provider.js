"use client";
import {createContext, memo, useRef} from "react";
import {StoreCalendar} from "@/entities/calendar/store/store-calendar";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";

import "@/entities/calendar/ui/main/style.css";
import useOnScreen from "@/shared/hooks/useOnScreen";

const Main = dynamic(() => import("@/entities/calendar/ui/main/main"), {
    ssr: false,
    loading: () => (
        <div
            className="calendar_wrap"
            style={{position: "relative", minHeight: "300px"}}
        >
            <Loader style={{backgroundColor: "inherit"}}/>
        </div>
    ),
});

export const StoreCalendarContext = createContext(null);

export default memo(function CalendarProvider({
                                                  locale,
                                                  type,
                                                  id,
                                                  activeLanguage,
                                                  children,
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
                    activeLanguage
                ),
                storePhone: new StorePhone(findLocale.code),
            }}
        >
            <Main siteLocale={locale}/>
        </StoreCalendarContext.Provider>
    );
});
