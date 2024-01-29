import {Suspense} from "react";
import BannerTour from "@/entities/tour/ui/banner-tour";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import Guides from "@/shared/ui/guides";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import {createTranslation} from "@/i18n/server";
import TextAndSliderTourPage from "@/entities/tour/ui/text-and-slider-tour-page";
import {isMobileCheck} from "@/shared/hepers";
import dynamic from "next/dynamic";
import {PATH_TOURS} from "@/shared/constants/route";
import LatestReviews from "@/widgets/latest-reviews";
import Footer from "@/shared/ui/layouts/footer/footer";
import {getHrefLocale} from "@/i18n/get-href-locale";
import TextQuote from "@/widgets/text-quote";
import CityRow from "@/widgets/city-row/city-row";
import TourRow from "@/widgets/tour-row/tour-row";
import TextBlocks from "@/widgets/text-blocks";

const ChangeOfLanguage = dynamic(
    () => import("@/shared/ui/languages/change-of-language/change-of-language"),
    {ssr: false}
)

const MapAndSlider = dynamic(
    () => import("@/widgets/map-and-slider/map-and-slider"),
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
    const {t} = await createTranslation()
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
        {slug: getHrefLocale(locale, ''), title: t('Free Walking Tour')},
        {slug: page.city.slug, title: `${t('Free Tour')} ${page.city.title}`},
        {title: page.title}
    ]

    console.log(languages, 'languages222')
    return (
        <main>
            <BannerTour locale={page.locale} id={page.id} isMobile={isMobile}/>
            <TextAndSliderTourPage id={page.id} locale={page.locale} isMobile={isMobile}/>
            <TextQuote id={page.id} locale={locale} type="tour"/>
            <Suspense fallback={''}>
                <SsrCalendar locale={page.locale} type="tour" id={page.id} title={page.title}/>
                <MapAndSlider locale={page.locale} id={page.id}/>
                <LatestReviews id={page.id} locale={locale} type="tour"/>
                <TextBlocks id={page.id} locale={locale} type="tour"/>
                <Guides title={t('this Tour')} id={page.id} locale={page.locale} type="tour"/>
                <TourRow id={page.id} locale={page.locale} title={`${t('Other Tours in')} ${page.city.title}`}/>
                <CityRow id={page.id} locale={page.locale} title={`${t('See All Tours in')} ${page.city.title}`}/>
                <ChangeOfLanguage
                    languages={languages}
                />
                <Breadcrumbs pages={pagesBreadcrumbs} locale={locale}/>
                <Footer locale={locale}/>
            </Suspense>
        </main>
    )
}
