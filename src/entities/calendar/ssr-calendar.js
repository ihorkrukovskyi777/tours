import {getActiveLang, getFaqBlock} from "@/entities/api";
import Faqs from "@/shared/ui/faqs/faqs";
import {useCalendarTranslate} from "@/shared/hooks/useCalendarTranslate";
import ProcessBookingProvider from "@/entities/lib/calendar/process-booking.provider";


export default async function SsrCalendar({
                                              locale,
                                              type,
                                              id,
                                              showFaq = true,
                                              title,
                                              nameDayWeek = true,
                                              isMobile = false,
                                              pageTitle = '',
                                          }) {


    const [questions, activeLanguage] = await Promise.all([
        showFaq ? getFaqBlock(id, locale) : Promise.resolve(),
        getActiveLang(id, type, locale)
    ])

    const translate = await useCalendarTranslate(locale)

    if(!activeLanguage?.length) {
        return null
    }
    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <ProcessBookingProvider
                        i18n={translate}
                        option={{
                            isMobile: isMobile,
                            nameDayWeek: nameDayWeek,
                            pageTitle: pageTitle,
                            title: title,
                            locale: locale,
                            type: type,
                            id: id,
                            activeLanguage: activeLanguage,
                            showFaq: showFaq
                        }}
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
