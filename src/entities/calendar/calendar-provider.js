"use client";
import { createContext, memo } from "react";
import { StoreCalendar } from "@/entities/calendar/store/store-calendar";
import { StorePhone } from "@/entities/calendar/store/store-phone";
import Faqs from "@/shared/ui/faqs/faqs";
import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";

import "@/entities/calendar/ui/main/style.css";

const Main = dynamic(() => import("@/entities/calendar/ui/main/main"), {
  ssr: false,
  loading: () => (
    <div
      className="calendar_wrap"
      style={{ position: "relative", minHeight: "300px" }}
    >
      <Loader style={{ backgroundColor: "inherit" }} />
    </div>
  ),
});

export const StoreCalendarContext = createContext(null);

export default memo(function CalendarProvider({
  locale,
  type,
  id,
  activeLanguage,
  questions,
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
      <section id="tour_calendar_section" className="tour_calendar">
        <div className="container">
          <div className="wrapper">
            <Main siteLocale={locale} />
            <Faqs
              style={{ paddingRight: 0, paddingLeft: 0 }}
              questions={questions}
            />
          </div>
        </div>
      </section>
    </StoreCalendarContext.Provider>
  );
});
