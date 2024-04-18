"use client";
import Button from "@/shared/ui/selectors/button/button";
import CalendarWhite from "/public/images/svg/calendar-white.svg";

export default function BannerButtons({ i18n }) {
  function scrollToCalendar() {
    const section =
      document.querySelector("#tour_calendar_section") ||
      document.querySelector("#insert_code_block");

    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <>
      <Button onClick={scrollToCalendar}>{i18n.today}</Button>
      <Button onClick={scrollToCalendar}>{i18n.tomorrow}</Button>
      <Button
        customClass="calendar-btn"
        onClick={scrollToCalendar}
        icon={CalendarWhite}
      ></Button>
    </>
  );
}
