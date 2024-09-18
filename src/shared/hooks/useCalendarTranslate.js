import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import useGenitiveI18n from "@/i18n/hooks/useGenitiveI18n";

export async function useCalendarTranslate(locale) {
    const [i18n,  i18nGenitive] = await Promise.all([
        useDefaultI18n(locale),
        useGenitiveI18n(locale),
    ])

    return {
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
        free_tour_calendar: i18n.t('Free Tour Calendar'),
        modal_booking_title: i18n.t('Your booking details. You\'re almost there!'),
        first_name: i18n.t('First Name'),
        last_name: i18n.t('Last Name'),
        email: i18n.t('Email'),
        duration: i18n.t('Duration'),
        phone_number: i18n.t('Phone Number'),
        errors: i18n.getFormErrors(),
        see_all: i18n.t('See All'),
        faq: i18n.t('FAQs for Free Tours'),
        flexible: i18n.t('Flexible'),
        genitive: {
            months: {
                ...i18nGenitive.getMonths(),
            }
        }
    }
}