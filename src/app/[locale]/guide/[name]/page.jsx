import {notFound} from "next/navigation";
import {Suspense} from "react";
import {fetchSubVendorBySlug, getPageLanguage} from "@/entities/guide/api";
import BannerGuide from "@/entities/guide/ui/banner-guide";
import GuideTours from "@/entities/guide/ui/guide-tours/guide-tours";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import {headers} from "next/headers";
import {isMobileCheck} from "@/shared/helpers";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Footer from "@/shared/ui/layouts/footer/footer";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/generator-seo";
import {PATH_GUIDES} from "@/shared/constants/route";
import ProductSchemaGuide from "@/shared/schema/guide/product";
import PlaceGuideSchema from "@/shared/schema/guide/place";
import EventsGuideSchema from "@/shared/schema/guide/events";
import i18n from "@/i18n/server-locales";
export default async function PageGuide({params: {name, locale}}) {
    const [pageSub, languages] = await Promise.all([
        fetchSubVendorBySlug(name),
        getPageLanguage()
    ])

    await i18n.getFetchDefault();

    if (pageSub?.statusCode === 404) {
        notFound();
    }

    const languagesFormatted = languages.map(sub => ({...sub, slug: `${sub.slug}/${name}`}))
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    return (
        <>
            <Suspense fallback={''}>
                <BannerGuide id={pageSub.id} isMobile={isMobile}/>
            </Suspense>
            <Suspense fallback={''}>
                <ProductSchemaGuide slug={name} locale={locale} />
                <PlaceGuideSchema slug={name} locale={locale}/>
                <EventsGuideSchema slug={name} locale={locale}/>
            </Suspense>
            <Suspense fallback={''}>
                <GuideTours id={pageSub.id} locale={locale} brandName={ pageSub.brandName}/>
                <SsrCalendar locale={locale} type="sub-vendor" id={pageSub.id} showFaq={false}/>
                <I18nChangeOfLanguage locale={locale} languages={languagesFormatted} title={pageSub.brandName}/>
                <Breadcrumbs pages={[{slug: '/', title: 'Free Tours'}, {title: pageSub.brandName }]} locale={locale} />
                <Footer locale={locale}/>
            </Suspense>
        </>
    )
}
export async function generateMetadata({ params : {name, locale} }) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/type/guide/${name}?locale=${locale}`, {next: { revalidate: 60 * 60, tags: ['seo'] }}).then((res) => res.json())
    const canonical = locale === fallbackLng ? `${PATH_GUIDES}/${name}` : `${locale}/${PATH_GUIDES}/${name}`

    return generatorSeo(seo,  canonical, locale)
}