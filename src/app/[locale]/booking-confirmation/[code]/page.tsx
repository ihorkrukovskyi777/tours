import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {notFound} from "next/navigation";
import LanguageImages from "@shared/ui/languages/language-images";
import Link from "next/link";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {ADDITIONAL_ROUTE, CHECKOUT, PATH_TOURS} from "@shared/constants/route";
import {ServiceDate} from "@shared/service/service-date";
import {pad2, toHoursAndMinutes} from "@shared/helpers/date";
import ClockSvg from '@/assets/images/svg/clock-svg';
import ChangeOfLanguage from "@shared/ui/languages/change-of-language/change-of-language";
import {locales} from "@/i18n/settings";
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

    const languages = locales.map(locale => ({slug: `${ADDITIONAL_ROUTE}/${params.code}`, locale}))

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
                <h1>{i18n.t('Click on the links below to see full booking confirmation and manage your bookings.')}</h1>

                <div className="page_orders__items">
                    {sortBooking(bookings).map(booking => {

                        const serviceDate = new ServiceDate(booking.fullTime)
                        const slug = `${getHrefLocale(booking.profile.locale)}${booking.profile.city?.slug}/${PATH_TOURS}/${booking.profile.slug}`;

                        const duration = toHoursAndMinutes(booking.duration * 60);

                        const checkoutSlug = getHrefLocale(booking.profile.locale, `${CHECKOUT}?code=${booking.checkout_code}`)
                        const isSelfGuide = serviceDate.time === '23:59'
                        const durationLabel = isSelfGuide ? i18n.t('Flexible') : booking.duration > 1 ? i18n.t('Hours') : i18n.t('Hour')

                        return (
                            <div key={booking.booking_id}>
                                <div className="page_orders__item">
                                    <Link href={slug}>
                                        <h3 className="page_orders__title">
                                            {booking.profile.title} <LanguageImages
                                            locales={[{code: booking.locale, id: 1}]}/>
                                        </h3>
                                    </Link>
                                    <span>
                                {i18n.t('Booking ID')}: {booking.booking_id}
                            </span>

                                    <span>
                                {days[serviceDate.day]}, {serviceDate.dayNum} {months[serviceDate.month]} {serviceDate.yearNum}, {serviceDate.time}
                            </span>
                                    <span>
                              <ClockSvg/> <span>{duration.hours}:{pad2(duration.minutes)} {durationLabel}, {booking.number_people} {i18n.t('People')}</span>
                            </span>
                                </div>
                                <Link href={checkoutSlug}
                                      className="page_orders__button">{i18n.t('Edit Booking')}
                                </Link>
                            </div>
                        )
                    })}
                </div>

            </div>
            <ChangeOfLanguage
                languages={languages}
                addQueries={false}
                title={i18n.t('Booking Confirmation')}
                i18n={{
                    load_more: i18n.t('Load More'),
                    free_tour_tour_language: ''
                }}
            />
        </div>
    )
}


export async function generateMetadata({params}) {
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
        title: title[params.locale],
    }
}