import Footer from "@/shared/ui/layouts/footer/footer";
import {notFound} from "next/navigation";
import {CardExperience} from "@entities/paid-tour/@types";


import CouponViews from "@/app/[locale]/paid-tours-in/[slug]/coupon-views";
import './style.css'
import {getLocale} from "next-intl/server";
export interface DataPagePaidTours {
    city: {
        title: string
        slug: string
    }
    tours: CardExperience[]
}

async function fetchToursPaid(slug: string ,locale: string) {
    return fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/paid-tours-search/by-city/${slug}?locale=${locale}&site=strawberrytours`, {
        next: {
            revalidate: 0
        }
    })
}

export default async function CongratulationsPage({params: { slug}}: any) {

    const locale = await getLocale()


    const response = await fetchToursPaid(slug, locale)
    if (!response.ok) {
        notFound()
    }
    const data = await response.json() as DataPagePaidTours;




    return (
        <>
            <CouponViews data={data}/>
            <Footer locale={locale} resetCookies={false}/>
        </>
    )
}

// @ts-ignore
export async function generateMetadata({params}: any) {
    const isIndexation = process.env.NEXT_PUBLIC_GOOGLE_INDEXATION === 'yes';
    const locale = params?.locale ? params.locale : 'en'
    const titles = {
        en: `Paid Tours in ${params?.slug}`,
        es: `Tours Pagados en ${params?.slug}`,
        'pt-pt': `Passeios pagos em ${params?.slug}`,
        fr: `Visites payantes à ${params?.slug}`,
        de: `Bezahlte Touren in ${params?.slug}`,
        nl: `Betaalde rondleidingen in ${params?.slug}`,
        pl: `Płatne wycieczki po ${params?.slug}`,
        cat: `Visites de pagament a ${params?.slug}`,
    }
    return {
        robots: {index: isIndexation, follow: isIndexation},
        // @ts-ignore
        title: titles[locale] ?? `Paid Tours in ${params?.slug}`,
    }
}