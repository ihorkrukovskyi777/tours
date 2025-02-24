import BannerTour from "@/entities/tour/ui/banner-tour";
import TextAndSliderTourPage from "@/entities/tour/ui/text-and-slider-tour-page";
import {Suspense} from "react";
import EventsSchema from "@/shared/schema/events";
import PlaceSchema from "@/shared/schema/place";
import ProductSchema from "@/shared/schema/product";
import MapAndSliderTour from "@/entities/tour/ui/map-and-slider-tour/map-and-slider-tour";
import TextQuote from "@/widgets/text-quote";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import LatestReviews from "@/widgets/latest-reviews";
import TextBlocks from "@/widgets/text-blocks";
import Guides from "@/shared/ui/guides";
import InsertPartnerCode from "@/widgets/insert-code/insert-partner-code";
import InsertCode from "@/widgets/insert-code/insert-code";
import TourRow from "@/widgets/tour-row/tour-row";
import CityRow from "@/widgets/city-row/city-row";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Footer from "@/shared/ui/layouts/footer/footer";

const OneportTours = ({ languages, isMobile, page, locale, i18n, pagesBreadcrumbs }) => {
    return (
        <main>
            <BannerTour locale={page.locale} id={page.id} isMobile={isMobile}/>
            <TextAndSliderTourPage
                id={page.id}
                locale={page.locale}
                isMobile={isMobile}
            />
            <Suspense fallback={""}>
                <EventsSchema id={page.id} locale={locale} type="tour"/>
                <PlaceSchema id={page.id} locale={locale}/>
                <ProductSchema id={page.id} locale={locale} type="tour"/>
            </Suspense>
            <Suspense fallback={""}>
                <MapAndSliderTour hideBottom={false} locale={page.locale} id={page.id}>
                    <TextQuote id={page.id} locale={locale} type="tour"/>
                </MapAndSliderTour>
                <SsrCalendar
                    locale={page.locale}
                    type="tour"
                    id={page.id}
                    title={page.title}
                    isMobile={isMobile}
                    titleCalendar={i18n.t("Tour Calendar")}
                />
                <LatestReviews
                    id={page.id}
                    locale={locale}
                    type="tour"
                    showTitle={false}
                />
                <TextBlocks id={page.id} locale={locale} type="tour"/>
                <Guides
                    title={i18n.t("Guides Leading this Tour")}
                    id={page.id}
                    locale={page.locale}
                    type="tour"
                />
                <InsertPartnerCode id={page.id} type="tour" locale={page.locale} isMobile={isMobile}/>
                <InsertCode id={page.id} type="tour" locale={page.locale}/>
                <TourRow
                    id={page.id}
                    locale={page.locale}
                    title={`${i18n.t("Other Tours in")} ${page.city.title}`}
                />
                <CityRow
                    id={page.id}
                    locale={page.locale}
                    title={`${i18n.t("See All Tours in")} ${page.city.title}`}
                />
                <I18nChangeOfLanguage locale={locale} languages={languages}/>
                <Breadcrumbs pages={pagesBreadcrumbs} locale={locale}/>
                <Footer locale={locale}/>
            </Suspense>
        </main>
    )
}

export default OneportTours