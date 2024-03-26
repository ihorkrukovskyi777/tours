import {Suspense} from "react";
import BannerCity from "@/entities/city/ui/banner-city";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import MostPopularTours from "@/entities/city/ui/most-popular-tours";
import LatestReviews from "@/widgets/latest-reviews";
import Highlights from "@/widgets/highlights";
import TextBlocks from "@/widgets/text-blocks";
import Guides from "@/shared/ui/guides";
import MostPopularCity from "@/entities/city/ui/most-popular-city";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Footer from "@/shared/ui/layouts/footer/footer";
import PlaceSchema from "@/shared/schema/place";
import ProductSchema from "@/shared/schema/product";
import EventsSchema from "@/shared/schema/events";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
export default async function CityPage({locale, title, id, languages, slug, isMobile}) {
    const i18n = await useDefaultI18n(locale);

    let breadcrumbsTitle = i18n.t('Free Walking Tour Breadcrumbs')
    breadcrumbsTitle = breadcrumbsTitle.replace(' Breadcrumbs', '')
    return (
        <>
            <BannerCity
                isMobile={isMobile}
                pageTitle={title}
                size="city_banner"
                locale={locale}
                id={id}
            />
            <EventsSchema id={id} locale={locale} type="city"/>
            <PlaceSchema id={id} locale={locale}/>
            <ProductSchema id={id} locale={locale}/>
            <Suspense fallback={''}>
                <SsrCalendar locale={locale} type="city" id={id} title={i18n.tReplace('%s Tour Calendar', title)} isMobile={isMobile}/>
                <MostPopularTours id={id} locale={locale} slug={slug} title={title} size={'small'}/>
                <LatestReviews id={id} locale={locale}/>
                <Highlights id={id} locale={locale}/>
                <TextBlocks id={id} locale={locale}/>
                <Guides id={id} locale={locale} title={title} type="city"/>
                <MostPopularCity locale={locale} id={id} slug={slug} size={'medium'} />
                <I18nChangeOfLanguage locale={locale} languages={languages} title="Free Tours"/>
                <Breadcrumbs pages={[{slug: '/', title: breadcrumbsTitle}, {title: title}]} locale={locale}/>
                <Footer locale={locale}/>
            </Suspense>

            </>
    )
}
