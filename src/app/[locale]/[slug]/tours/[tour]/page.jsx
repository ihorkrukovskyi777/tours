import {Suspense} from "react";
import BannerTour from "@/entities/tour/ui/banner-tour";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import Guides from "@/shared/ui/guides";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import TextAndSliderTourPage from "@/entities/tour/ui/text-and-slider-tour-page";
import {isMobileCheck} from "@/shared/helpers";
import dynamic from "next/dynamic";
import {PATH_TOURS} from "@/shared/constants/route";
import LatestReviews from "@/widgets/latest-reviews";
import Footer from "@/shared/ui/layouts/footer/footer";
import {getHrefLocale} from "@/i18n/get-href-locale";
import TextQuote from "@/widgets/text-quote";
import CityRow from "@/widgets/city-row/city-row";
import TourRow from "@/widgets/tour-row/tour-row";
import TextBlocks from "@/widgets/text-blocks";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/generator-seo";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import i18n from "@/i18n";
import PlaceSchema from "@/shared/schema/place";
import ProductSchema from "@/shared/schema/product";
import EventsSchema from "@/shared/schema/events";
const ProviderMap = dynamic(
    () => import("@/widgets/map-and-slider/provider"),
    {ssr: false}
)

export default async function Page({params: {locale, slug, tour}}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/${slug}/tours/${tour}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const page = await data.json();
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    await i18n.getFetch();
    if (page.statusCode === 404) {
        notFound();
    }

    const languages = page.languages?.map(item => {
        const city = page.cityLanguages.find(city => city.locale === item.locale)
        if (!city?.slug)
            return null
        return ({...item, slug: `${city.slug}/${PATH_TOURS}/${item.slug}`})
    }).filter(Boolean);

    const pagesBreadcrumbs = [
        {slug: getHrefLocale(locale, ''), title: i18n.t('Free Walking Tour')},
        {slug: page.city.slug, title: `${i18n.t('Free Tour')} ${page.city.title}`},
        {title: page.title}
    ]

    return (
        <main>
            <BannerTour locale={page.locale} id={page.id} isMobile={isMobile}/>
            <TextAndSliderTourPage id={page.id} locale={page.locale} isMobile={isMobile}/>
            <TextQuote id={page.id} locale={locale} type="tour"/>
            <Suspense fallback={''}>
                <EventsSchema id={page.id} locale={locale} type="tour"/>
                <PlaceSchema id={page.id} locale={locale}/>
                <ProductSchema id={page.id} locale={locale} type="tour"/>
            </Suspense>
            <Suspense fallback={''}>
                <SsrCalendar locale={page.locale} type="tour" id={page.id} title={page.title}/>
                <ProviderMap locale={page.locale} id={page.id} i18n={i18n.getMapSliders()}/>
                <LatestReviews id={page.id} locale={locale} type="tour"/>
                <TextBlocks id={page.id} locale={locale} type="tour"/>
                <Guides title={i18n.t('this Tour')} id={page.id} locale={page.locale} type="tour"/>
                <TourRow id={page.id} locale={page.locale} title={`${i18n.t('Other Tours in')} ${page.city.title}`}/>
                <CityRow id={page.id} locale={page.locale} title={`${i18n.t('See All Tours in')} ${page.city.title}`}/>
                <I18nChangeOfLanguage
                    locale={locale}
                    languages={languages}
                />
                <Breadcrumbs pages={pagesBreadcrumbs} locale={locale}/>
                <Footer locale={locale}/>
            </Suspense>
        </main>
    )
}

export async function generateMetadata({ params : {slug, locale, tour} }) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/${slug}?locale=${locale}`, {next: { revalidate: 0 }}).then((res) => res.json())

    const canonical = locale === fallbackLng ? `${slug}/${PATH_TOURS}/${tour}` : `${locale}/${slug}/${PATH_TOURS}/${tour}`
    return generatorSeo(seo, canonical, locale)
}