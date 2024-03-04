import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Checkout from "@/entities/checkout/main";
import Footer from "@/shared/ui/layouts/footer/footer";
import TourRow from "@/widgets/tour-row/tour-row";
import {notFound} from "next/navigation";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import useGenitiveI18n from "@/i18n/hooks/useGenitiveI18n";


export default async function CheckoutPage({params: {locale}, searchParams}) {

    let checkoutData = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${searchParams.code}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    checkoutData = await checkoutData.json();

    if (checkoutData?.data?.status === 404) {
        notFound();
    }
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/checkout?locale=${locale}`,
        {next: {revalidate: 0}}
    )

    const page = await pageType.json();
    if (page.statusCode === 404 || typeof page.id !== 'number') {
        notFound();
    }
    const [i18n, i18nGenitive] = await Promise.all([
        useDefaultI18n(locale),
        useGenitiveI18n(locale),
    ])

    const currentPage = page.languages.find(item => item.locale === locale);

    const translates = {
        name: i18n.t('Name'),
        email: i18n.t('Email'),
        phone_number: i18n.t('Phone Number'),
        booking_id: i18n.t('Booking ID'),
        tour: i18n.t('Tour'),
        language: i18n.t('Language'),
        date: i18n.t('Date'),
        time: i18n.t('Time'),
        duration: i18n.t('Duration'),
        number_people: i18n.t('Number of people'),
        guide: i18n.t('Guide'),
        start_point: i18n.t('Starting point'),
        directions: i18n.t('Directions'),
        cancel_book: i18n.t('Cancel Booking'),
        contact_your_guide: i18n.t('Contact Your Guide'),
        edit_booking: i18n.t('Edit Booking'),
        change_data_time_number_people: i18n.t('Change Date/Time/Number of people'),
        lower_change_data_time_number_people: i18n.t('change date/time/number of people'),
        days: i18n.getDays(),
        months: i18n.getMonths(),
        first_name: i18n.t('First Name'),
        last_name: i18n.t('Last Name'),
        phone: i18n.t('Phone'),
        save: i18n.t('Save'),
        more_than_10_characters: i18n.t('The message must contain more than 10 characters'),
        write_your_message_here_: i18n.t('Write your message here...'),
        send_messages: i18n.t('Send Message'),
        save_changes: i18n.t('Save changes'),
        how_many_people_are_coming: i18n.t('How many people are coming?'),
        departures_available: i18n.t('Departure(s) Available'),
        back: i18n.t('Back'),
        your_message_has_been_sent: i18n.t('Your message has been sent'),
        hours: i18n.t('Hours'),
        hour: i18n.t('Hour'),
        close: i18n.t('Close'),
        download_voucher: i18n.t('Voucher download'),
        departure_not_available: i18n.t('Departure not available'),
        notification_wrong: i18n.t('Something went wrong, we couldn\'t change your order'),
        genitive: {
            months: {
                ...i18nGenitive.getMonths(),
            }
        },
        errors: {
            ...i18n.getFormErrors(),
            first_name: {
                ERROR_VALIDATION: i18n.t('This field is required'),
                ERROR_VALIDATION_MAXLENGTH: i18n.t('first_name_max_length_is_50_symbols'),
                ERROR_VALIDATION_WITHOUT_NUMBER: i18n.t('first_name_should_be_without_numbers'),
            },
            last_name: {
                ERROR_VALIDATION: i18n.t('This field is required'),
                ERROR_VALIDATION_MAXLENGTH: i18n.t('last_name_should_be_without_numbers'),
                ERROR_VALIDATION_WITHOUT_NUMBER: i18n.t('last_name_should_be_without_numbers'),
            }
        }
    }
    return (
        <>
            <Checkout title={currentPage?.title} i18n={translates} locale={locale} tourLocale={checkoutData.locale}/>
            <TourRow
                sizeSection={'small'}
                id={checkoutData.tour_id} locale={locale}
                title={`${i18n.t('Other Tours in')} 
                ${checkoutData.city?.post_title}`}
            />
            <I18nChangeOfLanguage locale={locale} languages={page.languages}/>
            <Footer locale={locale}/>
        </>
    )
}

export async function generateMetadata({params: {locale}}) {

    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/checkout?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    const data = await pageType.json();

    const find = data?.languages.find(seo => seo.locale === locale);
    return {
        title: find?.title ?? 'Checkout',
        robots: {index: false, follow: false},
    }
}