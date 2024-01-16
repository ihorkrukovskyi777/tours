import CalendarProvider from "@/entities/calendar/calendar-provider";
import { getActiveLang } from "@/entities/api";

export default async function SsrCalendar({locale, type, id}) {

    const activeLanguage = await getActiveLang(id);
    return  <CalendarProvider locale={locale} type={type} id={id} activeLanguage={activeLanguage}/>
}
