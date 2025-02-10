import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {notFound} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {ADDITIONAL_ROUTE, CHECKOUT, PATH_TOURS} from "@shared/constants/route";
import {ServiceDate} from "@shared/service/service-date";
import {pad2, toHoursAndMinutes} from "@shared/helpers/date";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import {locales} from "@/i18n/settings";
import OrderBookingCard from "@shared/ui/card-components/order-booking-card/order-booking-card";
import ClientComponent from "@/app/[locale]/booking-confirmation/[code]/client-component";
import './style.css'
interface Booking {
    profile: {
        title: string
        slug: string
        city: {
            slug: string
        }
        locale: string
    }
    type: 'civitatis' | 'bokun' | 'oneport'
    locale: string
    fullTime: string
    checkout_code: string
    booking_id: number
    number_people: number
    duration: number
    booked_datetime: string
}

export default async function OderPage({params}: { params: { locale: string, code: string }, }) {

    const i18n = await useDefaultI18n(params.locale);


    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/checkout/additional-orders/${params.code}?locale=${params.locale}`, {
        next: {
            revalidate: 0
        }
    })

    if (!response.ok) {
        notFound()

    }

    const languages = locales.filter(locale => locale !== 'ru').map(locale => ({slug: `${ADDITIONAL_ROUTE}/${params.code}`, locale}))

    const bookings = await response.json() as Booking[];
    const months = i18n.getMonths();
    const days = i18n.getDays();


    const sortBooking = (bookings:Booking[]) => {
        return bookings.sort((a,b) => {
            return new Date(a.booked_datetime).getTime() - new Date(b.booked_datetime).getTime()
        })
    }

    return (
        <div className="page_orders_container">
            <div className="page_orders">
                <ClientComponent />
                {bookings.length === 1 ? <span className="page_orders_error">{i18n.t('An error occurred while booking an additional tour.')}</span> : null}
                <h1>{i18n.t('Click on the links below to see full booking confirmation and manage your bookings.')}</h1>
                <div className="page_orders__items">
                    {sortBooking(bookings).map(booking => {

                        const serviceDate = new ServiceDate(booking.fullTime)


                        const slug = `${getHrefLocale(booking.profile.locale)}${booking.profile.city?.slug}/${PATH_TOURS}/${booking.profile.slug}`;

                        const duration = toHoursAndMinutes(booking.duration * 60);

                        let checkoutSlug = getHrefLocale(booking.profile.locale, `${CHECKOUT}?code=${booking.checkout_code}`)

                        if(booking.type === 'bokun') {
                            checkoutSlug = getHrefLocale(booking.profile.locale, `${CHECKOUT}/${booking.checkout_code}`)
                        }
                        const isSelfGuide = serviceDate.time === '23:59'
                        const durationLabel = isSelfGuide ? i18n.t('Flexible') : booking.duration > 1 ? i18n.t('Hours') : i18n.t('Hour')

                        return (
                            <>
                                <OrderBookingCard
                                    id={booking.booking_id}
                                    slug={slug}
                                    title={booking.profile.title}
                                    locale={booking.locale}
                                    checkoutSlug={checkoutSlug}
                                    durationLabel={durationLabel}
                                    hours={duration.hours}
                                    minutes={pad2(duration.minutes)}
                                    number_people={booking.number_people}
                                    day={days[serviceDate.day]}
                                    dayNum={serviceDate.dayNum}
                                    month={months[serviceDate.month]}
                                    year={serviceDate.yearNum}
                                    time={isSelfGuide ? i18n.t('Flexible') : serviceDate.time}
                                />
                            </>
                        )
                    })}
                </div>

            </div>
            <I18nChangeOfLanguage
                languages={languages}
                addQueries={false}
                title={i18n.t('Booking Confirmation')}
                locale={params.locale}
                i18n={{
                    load_more: i18n.t('Load More'),
                    free_tour_tour_language: ''
                }}
            />

        </div>
    )
}


// @ts-ignore
export async function generateMetadata({params}: { locale: string}) {
    const title = {
        en: 'Booking Confirmation',
        es: 'Confirmación de reserva',
        'pt-pt': 'Confirmação de reserva',
        fr: 'Confirmation de réservation',
        de: 'Buchungsbestätigung',
        nl: 'Boekingsbevestiging',
        pl: 'Potwierdzenie rezerwacji',
        cat: 'Confirmació de reserva',
    }
    return {
        robots: {index: false, follow: false},
        // @ts-ignore
        title: title[params?.locale] ?? 'Booking Confirmation',
    }
}