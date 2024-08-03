import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";
import Faqs from "@/shared/ui/faqs/faqs";

import {useCalendarTranslate} from "@/shared/hooks/useCalendarTranslate";


export default async function SsrCalendar({locale, type, id, showFaq = true, title, nameDayWeek = true, isMobile = false , pageTitle = '' , titleCalendar = '' }) {


    const [questions, activeLanguage] = await Promise.all([
        showFaq ? getFaqBlock(id, locale) : Promise.resolve(),
        getActiveLang(id, type, locale)
    ])

    const translate = await useCalendarTranslate(locale)

    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <CalendarProvider
                        isMobile={isMobile}
                        nameDayWeek={nameDayWeek}
                        i18n={translate}
                        pageTitle={pageTitle}
                        title={title}
                        locale={locale}
                        type={type}
                        id={id}
                        activeLanguage={activeLanguage}
                        showFaq={showFaq}
                        titleCalendar={titleCalendar}
                    />
                    {activeLanguage?.length ?
                        <Faqs
                            i18n={{faq: translate.faq}}
                            style={{paddingRight: 0, paddingLeft: 0}}
                            questions={questions}
                        />
                        : null}

                </div>
            </div>
        </section>
    )
}
