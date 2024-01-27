import {getActiveLang, getFaqBlock} from "@/entities/api";
import Faqs from "@/shared/ui/faqs/faqs";
import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";
const CalendarProvider = dynamic(() => import("@/entities/calendar/calendar-provider"), {
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
                        showFaq={showFaq}
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
