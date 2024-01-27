import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";
import Faqs from "@/shared/ui/faqs/faqs";

export default async function SsrCalendar({locale, type, id, showFaq = true, title}) {

    const [questions, activeLanguage] = await Promise.all([
        showFaq ? getFaqBlock(id, locale) : Promise.resolve(),
        getActiveLang(id, type)
    ])


    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <CalendarProvider
                        title={title}
                        locale={locale}
                        type={type}
                        id={id}
                        activeLanguage={activeLanguage}
                        questions={questions} showFaq={showFaq}
                    />
                    <Faqs
                        style={{paddingRight: 0, paddingLeft: 0}}
                        questions={questions}
                    />
                </div>
            </div>
        </section>
    )
}
