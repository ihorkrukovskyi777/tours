import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";

export default async function SsrCalendar({locale, type, id, showFaq = true }) {

    const [questions, activeLanguage] = await Promise.all([
        showFaq ? getFaqBlock(id, locale) : Promise.resolve(),
        getActiveLang(id, type)
    ])

    return <CalendarProvider locale={locale} type={type} id={id} activeLanguage={activeLanguage} questions={questions} showFaq={showFaq}/>
}
