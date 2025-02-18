import Footer from "@shared/ui/layouts/footer/footer";
import {notFound} from "next/navigation";
import {CardExperience} from "@entities/paid-tour/@types";


import CouponViews from "@/app/[locale]/[slug]/paid-tours/coupon-views";
import './style.css'
import {getLocale} from "next-intl/server";
import {capitalizeFirstLetter} from "@shared/helpers";
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
    const locale = await getLocale();
    const titles = {
        en: `Paid Tours in ${capitalizeFirstLetter(params?.slug ?? '')}`,
        es: `Tours de pago en ${capitalizeFirstLetter(params?.slug ?? '')}`,
        'pt-pt': `Tours Pagos em ${capitalizeFirstLetter(params?.slug ?? '')}`,
        fr: `Tours Payants à ${capitalizeFirstLetter(params?.slug ?? '')}`,
        de: `Kostenpflichtige Tours in ${capitalizeFirstLetter(params?.slug ?? '')}`,
        nl: ` Betaalde Tours in ${capitalizeFirstLetter(params?.slug ?? '')}`,
        pl: `Płatne Tours w ${capitalizeFirstLetter(params?.slug ?? '')}`,
        cat: `Tours de Pagament a ${capitalizeFirstLetter(params?.slug ?? '')}`,
        it: `Tours a Pagamento a ${capitalizeFirstLetter(params?.slug ?? '')}`,
    }
    return {
        robots: {index: isIndexation, follow: isIndexation},
        // @ts-ignore
        title: titles[locale] ?? `Paid Tours in ${capitalizeFirstLetter(params?.slug ?? '')}`,
    }
}