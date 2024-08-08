import {Suspense} from "react";
import BannerCity from "@/entities/city/ui/banner-city";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import MostPopularTours from "@/entities/city/ui/most-popular-tours";
import Guides from "@/shared/ui/guides";
import MostPopularCity from "@/entities/city/ui/most-popular-city";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Footer from "@/shared/ui/layouts/footer/footer";
import PlaceSchema from "@/shared/schema/place";
import ProductSchema from "@/shared/schema/product";
import EventsSchema from "@/shared/schema/events";
import InsertCode from "@/widgets/insert-code/insert-code";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import PartnerTours from "@/entities/city/ui/partner-tours";
import {getTextsBlocks} from "@/entities/api";
import TravelResources from "@/widgets/travel-resources/travel-resources";

export default async function CityPage({
                                           locale,
                                           title,
                                           id,
                                           languages,
                                           slug,
                                           isMobile,
                                       }) {
    const i18n = await useDefaultI18n(locale);


    let texts = await getTextsBlocks(id, locale, 'city');
    texts = Array.isArray(texts) ? texts : [];

    const getTitleText1 = i18n.t("Best Free Walking Tours in") + ' ' + title;
    const getTitleText3 = i18n.t("Things to Do in") + ' ' + title;

    let breadcrumbsTitle = i18n.t("Free Walking Tour Breadcrumbs");
    breadcrumbsTitle = breadcrumbsTitle.replace(" Breadcrumbs", "");
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
            <Suspense fallback={""}>
                <SsrCalendar
                    locale={locale}
                    type="city"
                    id={id}
                    title={title + ' ' + i18n.t("Free Tour Calendar") }
                    titleCalendar={title + ' ' + i18n.t("Free Tour Calendar")}
                    isMobile={isMobile}
                />
                <MostPopularTours
                    id={id}
                    locale={locale}
                    slug={slug}
                    title={title}
                    size={"small"}
                    titleTextSection={getTitleText1}
                    textSectionData={texts}
                    isMobile={isMobile}
                />

                <PartnerTours
                    id={id}
                    locale={locale}
                    size={"small"}
                    title={title}
                    titleTextSection={getTitleText3}
                    textSectionData={texts}
                />

                <Guides id={id} locale={locale} title={i18n.t('Free Tour Guides in') + ' ' + title} type="city"/>
                <InsertCode id={id} type="city" locale={locale}/>
                <TravelResources id={id} locale={locale}/>
                <MostPopularCity locale={locale} id={id} slug={slug} size={"medium"} title={i18n.t("Free Tours in More Cities")}/>
                <I18nChangeOfLanguage
                    locale={locale}
                    languages={languages}
                    title="Free Tours"
                />
                <Breadcrumbs
                    pages={[{slug: "/", title: breadcrumbsTitle}, {title: title}]}
                    locale={locale}
                />
                <Footer locale={locale}/>
            </Suspense>
        </>
    );
}
