import {Suspense} from "react";
import BannerCity from "@/entities/city/ui/banner-city";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import MostPopularTours from "@/entities/city/ui/most-popular-tours";
import Guides from "@/shared/ui/guides";
import MostPopularCity from "@/entities/city/ui/most-popular-city";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import {createTranslation} from "@/i18n/server";
import Footer from "@/shared/ui/layouts/footer/footer";
import dynamic from "next/dynamic";
const Highlights = dynamic(
    () => import("@/widgets/highlights"),
    {ssr: false }
)
const TextBlocks = dynamic(
    () => import("@/widgets/text-blocks"),
    {ssr: false }
)
const ChangeOfLanguage = dynamic(
    () => import("@/shared/ui/languages/change-of-language/change-of-language"),
    {ssr: false }
)
const LatestReviews = dynamic(
    () => import("@/widgets/latest-reviews"),
    {ssr: false }
)
export default async function CityPage({locale, title, id, languages, slug, isMobile}) {
    const {t} = await createTranslation(locale);


    return (
        <>
            <BannerCity
                isMobile={isMobile}
                size="city_banner"
                locale={locale}
                id={id}
            />
            <Suspense fallback="">
                <SsrCalendar locale={locale} type="city" id={id}/>
                <MostPopularTours id={id} locale={locale} slug={slug}/>
                <LatestReviews id={id} locale={locale}/>
                <Highlights id={id}/>
                <TextBlocks id={id} locale={locale}/>
                <Guides id={id} locale={locale} title={title} type="city"/>
                <MostPopularCity locale={locale} id={id} slug={slug}/>
                <ChangeOfLanguage languages={languages} title={t('Free Tours')}/>
                <Breadcrumbs pages={[{slug: '/', title: t('Free Tour')}, {title: title}]} locale={locale}/>
                <Footer locale={locale}/>
            </Suspense>
        </>
    )
}
