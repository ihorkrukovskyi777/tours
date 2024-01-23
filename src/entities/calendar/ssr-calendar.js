import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";
import {fetchDepartures} from "@/entities/calendar/api";
import {getCountryPhone} from "@/entities/api";
export default async function SsrCalendar({locale, type, id}) {


    const [questions, activeLanguage, phones] = await Promise.all([
        getFaqBlock(id, locale),
        getActiveLang(id, type),
        getCountryPhone(locale),
    ])
    let findLocale = activeLanguage?.find(item => item.code === locale);
    if(!findLocale) {
        [findLocale] = activeLanguage
    }
    const  hydration =   await fetchDepartures(id, type, locale);
    return <CalendarProvider locale={locale} type={type} id={id} activeLanguage={activeLanguage} findLocale={findLocale} questions={questions} hydration={hydration} phones={phones}/>
}
