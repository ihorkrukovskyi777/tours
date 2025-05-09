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
import {fallbackLng, locales} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/seo/generator-seo";
import {PATH_GUIDES} from "@/shared/constants/route";
import ProductSchemaGuide from "@/shared/schema/guide/product";
import PlaceGuideSchema from "@/shared/schema/guide/place";
import EventsGuideSchema from "@/shared/schema/guide/events";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
export default async function PageGuide({params: {name, locale}}) {
    const [pageSub, languages] = await Promise.all([
        fetchSubVendorBySlug(name),
        getPageLanguage()
    ])

    const i18n = await useDefaultI18n(locale);

    if (pageSub?.statusCode === 404 || !locales.includes(locale) ) {
        notFound();
    }

    const languagesFormatted = languages.map(sub => ({...sub, title: '', slug: `${sub.slug}/${pageSub.brandName.replaceAll(' ', '_').toLowerCase()}`}))
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));


    return (
        <>
            <BannerGuide id={pageSub.id} isMobile={isMobile}/>
            <Suspense fallback={''}>
                <ProductSchemaGuide slug={name} locale={locale} />
                <PlaceGuideSchema slug={name} locale={locale}/>
                <EventsGuideSchema slug={name} locale={locale}/>
            </Suspense>
            <Suspense fallback={''}>
                <GuideTours id={pageSub.id} locale={locale} brandName={ pageSub.brandName}/>
                <SsrCalendar
                    isMobile={isMobile}
                    nameDayWeek={false}
                    locale={locale}
                    type="sub-vendor"
                    id={pageSub.id}
                    isGuide={true}
                    title={pageSub.brandName}
                    showFaq={false}
                />
                <I18nChangeOfLanguage locale={locale} languages={languagesFormatted} title={pageSub.brandName}/>
                <Breadcrumbs pages={[{slug: '/', title: i18n.t('Free Tours')}, {title: pageSub.brandName }]} locale={locale} />
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