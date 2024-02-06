import CalendarProvider from "@/entities/calendar/calendar-provider";
import {getActiveLang, getFaqBlock} from "@/entities/api";
import Faqs from "@/shared/ui/faqs/faqs";
import i18n from "@/i18n";

export default async function SsrCalendar({locale, type, id, showFaq = true, title}) {
    await i18n.getFetchDefault();

    const [questions, activeLanguage] = await Promise.all([
        showFaq ? getFaqBlock(id, locale) : Promise.resolve(),
        getActiveLang(id, type, locale)
    ])

    const translate = {
        pick_a_date: i18n.t('Pick a Date'),
        how_a_many_people: i18n.t('How many people are coming?'),
        departure_available: i18n.t('Departure(s) Available'),
        months: i18n.getMonths(),
        days: i18n.getDays(),
        save_changes: i18n.t('Save Change'),
        back: i18n.t('Back'),
        change: i18n.t('change'),
        book_now: i18n.t('Book Now'),
        people: i18n.t('People'),
        hours: i18n.t('Hours'),
        hour: i18n.t('Hour'),
        terms_and_conditions: i18n.t('Terms and Conditions'),
        i_accept_all: i18n.t('I accept all'),
        show_me_more: i18n.t('Show me More'),
        departures_not_found: i18n.t('Departures not found'),
        tour_calendar: i18n.t('Tour Calendar'),
        modal_booking_title: i18n.t('Your booking details. You\'re almost there!'),
        first_name: i18n.t('First Name'),
        last_name: i18n.t('Last Name'),
        email: i18n.t('Email'),
        phone_number: i18n.t('Phone Number'),
        errors: i18n.getFormErrors(),
    }
    return (
        <section id="tour_calendar_section" className="tour_calendar">
            <div className="container">
                <div className="wrapper">
                    <CalendarProvider
                        i18n={translate}
                        title={`${title} ${i18n.t('Tour Calendar')}`}
                        locale={locale}
                        type={type}
                        id={id}
                        activeLanguage={activeLanguage}
                        questions={questions} showFaq={showFaq}
                    />
                    {activeLanguage?.length ?
                        <Faqs
                            i18n={{faq: i18n.t('FAQ')}}
                            style={{paddingRight: 0, paddingLeft: 0}}
                            questions={questions}
                        />
                        : null}

                </div>
            </div>
        </section>
    )
}
