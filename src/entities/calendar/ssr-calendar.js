import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";

export default async function SsrCalendar({locale, type, id}) {
    const questions = await getFaqBlock(id, locale)
    const activeLanguage = await getActiveLang(id, type);
    return <CalendarProvider locale={locale} type={type} id={id} activeLanguage={activeLanguage} questions={questions}/>
}
