import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getSystemActiveLanguage} from "@/entities/system-distribution/api";
import {useCalendarTranslate} from "@/shared/hooks/useCalendarTranslate";
import Faqs from "@/shared/ui/faqs/faqs";

const getContentFlexible = (flexible, locale) => {
    const page = flexible.pageMeta?.find(item => item.locale === locale);

    const global =  flexible.globalMeta?.find(item => item.locale === locale);

    return {
        title: page?.title?.trim() || global?.title,
        faqs: (function(page, global) {
            return {
                title: page?.title?.trim() || global?.title || '',
                values: (page?.values?.length ? page.values : global.values)?.map(item => ({
                    title: item.question,
                    text: item.answer
                }))
            }
        })(page?.faqs, global?.faqs)
    }


}
export default async function SystemSsrCalendar({flexible, locale,  id, showFaq = true, nameDayWeek = true, isMobile = false , pageTitle = '' , titleCalendar = '' }) {

    const dataFlexible = getContentFlexible(flexible, locale)
    const type = 'system'
    const activeLanguage = await getSystemActiveLanguage(id, locale)

    const translate = await useCalendarTranslate(locale)

    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <CalendarProvider
                        isMobile={isMobile}
                        nameDayWeek={nameDayWeek}
                        i18n={translate}
                        titleCalendar={dataFlexible.title}
                        title={dataFlexible.title}
                        locale={locale}
                        type={type}
                        id={id}
                        activeLanguage={activeLanguage}
                        showFaq={showFaq}
                    />
                    {activeLanguage?.length && dataFlexible.faqs?.values?.length ?
                        <Faqs
                            i18n={{faq: dataFlexible.faqs.title}}
                            style={{paddingRight: 0, paddingLeft: 0}}
                            questions={dataFlexible.faqs.values}
                        />
                        : null}
                </div>
            </div>
        </section>
    )
}
