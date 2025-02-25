import Link from "next/link";
import LanguageImages from "@shared/ui/languages/language-images";
import ClockSvg from "@/assets/images/svg/clock-svg";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {getLocale} from "next-intl/server";
import './style.css';

interface Props {
    id: number,
    slug: string,
    title: string,
    checkoutSlug: string,
    durationLabel: string,
    hours: number,
    minutes: string
    number_people: number
    day: string,
    dayNum: number,
    month: string,
    year: number,
    time?: string
}

export default async function OrderBookingCard({
       id ,
       slug ,
       title ,
       checkoutSlug ,
       durationLabel,
       hours,
       minutes,
       number_people,
       day,
       dayNum,
       month,
       year,
       time

       }: Props)  {


    const locale = await getLocale();
    const i18n = await useDefaultI18n(locale);

    return (
        <div key={id}>
            <div className="page_orders__item">
                <Link href={slug}>
                    <h3 className="page_orders__title">
                        {title}
                        <LanguageImages locales={[{code: locale, id: 1}]}/>
                    </h3>
                </Link>
                <span>
                    {i18n.t('Booking ID')}: {id}
                </span>
                <span>
                    {day}, {dayNum} {month} {year}{time ? `, ${time}` : ''}
                </span>
                <span>
                    <ClockSvg/> <span>{hours}:{minutes} {durationLabel}, {number_people} {number_people > 1 ? i18n.t('People') : i18n.t('Person')}  </span>
                </span>
            </div>
            <Link href={checkoutSlug}
                  className="page_orders__button">{i18n.t('Edit Booking')}
            </Link>
        </div>
    )
}

/*
export default OrderBooking;*/
