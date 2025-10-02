import Footer from "@shared/ui/layouts/footer/footer";
import {notFound} from "next/navigation";
import {CardExperience} from "@entities/paid-tour/@types";

import {PAID_TOUR_IN_CITY} from "@/i18n/path-rewrites/paid-tour-in-city.mjs";
import CouponViews from "@/app/[locale]/[slug]/paid-tours/coupon-views";
import {getLocale, getTranslations} from "next-intl/server";
import {capitalizeFirstLetter} from "@shared/helpers";
import I18nChangeOfLanguage from "@shared/ui/languages/change-of-language/i18n-change-of-language";
import './style.css'

export interface DataPagePaidTours {
    city: {
        title: string
        slug: string
    }
    tours: CardExperience[]
}


const getTitles = (slug: string) => {
    return {
        en: `Paid Tours in ${capitalizeFirstLetter(slug ?? '')}`,
        es: `Tours de pago en ${capitalizeFirstLetter(slug ?? '')}`,
        'pt-pt': `Tours Pagos em ${capitalizeFirstLetter(slug ?? '')}`,
        fr: `Tours Payants à ${capitalizeFirstLetter(slug ?? '')}`,
        de: `Kostenpflichtige Tours in ${capitalizeFirstLetter(slug ?? '')}`,
        nl: ` Betaalde Tours in ${capitalizeFirstLetter(slug ?? '')}`,
        pl: `Płatne Tours w ${capitalizeFirstLetter(slug ?? '')}`,
        cat: `Tours de Pagament a ${capitalizeFirstLetter(slug ?? '')}`,
        it: `Tours a Pagamento a ${capitalizeFirstLetter(slug ?? '')}`,
    }
}

async function fetchToursPaid(slug: string, locale: string) {
    return fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/paid-tours-search/by-city/${slug}?locale=${locale}&site=strawberrytours`, {
        next: {
            revalidate: 0
        }
    })
}

export default async function CongratulationsPage({params: {slug}}: any) {
    console.log(333333)
    const locale = await getLocale()

    const t = await getTranslations();

    const [response] = await Promise.all([
        fetchToursPaid(slug, locale),
        fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
            {next: {revalidate: 0, tags: ['page']}}
        )
    ])


    if (!response.ok) {
        notFound()
    }
    const data = await response.json() as DataPagePaidTours;
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
        {next: {revalidate: 0, tags: ['page']}}
    )
    const page = await pageType.json();

    if (!data?.tours?.length || page.statusCode === 404 || typeof page.id !== 'number' || ['tour-page', 'tours'].includes(slug)) {
        notFound();
    }

    // @ts-ignore
    const languages = page.languages.filter(city => city.locale !== 'ru')?.map((city: any) => {
        return {
            // @ts-ignore
            title: t('tour_in_language'),
            locale: city.locale,
            slug: `${city.slug}/${PAID_TOUR_IN_CITY.getPathByLocale(city.locale)}`
        };
    }) ?? []
    return (
        <>
            <CouponViews data={data} title={t('paid_tours_in_city', {city: data.city?.title})}/>
            <div className="padding_md">
                <I18nChangeOfLanguage
                    key={locale}
                    free_tour_tour_language={t('tours_in_your_language')}
                    title=''
                    locale={locale}
                    languages={languages}
                />
            </div>
            <Footer locale={locale} resetCookies={false}/>
        </>
    )
}

// @ts-ignore
export async function generateMetadata({params}: any) {
    const isIndexation = process.env.NEXT_PUBLIC_GOOGLE_INDEXATION === 'yes';
    const locale = await getLocale();
    const titles = getTitles(params?.slug ?? '')
    return {
        robots: {index: isIndexation, follow: isIndexation},
        // @ts-ignore
        title: titles[locale] ?? `Paid Tours in ${capitalizeFirstLetter(params?.slug ?? '')}`,
    }
}