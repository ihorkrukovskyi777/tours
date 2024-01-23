import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";
import {fetchDepartures} from "@/entities/calendar/api";
import {getCountryPhone} from "@/entities/api";
export default async function SsrCalendar({locale, type, id}) {


    const [questions, activeLanguage, hydration, phones] = await Promise.all([
        getFaqBlock(id, locale),
        getActiveLang(id, type),
        fetchDepartures(id, type, locale),
        getCountryPhone(locale),
    ])
    return <CalendarProvider locale={locale} type={type} id={id} activeLanguage={activeLanguage} questions={questions} hydration={hydration} phones={phones}/>
}
