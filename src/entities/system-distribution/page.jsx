import {getPageBySlug,} from "@/entities/system-distribution/api";
import dynamic from "next/dynamic";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import {notFound} from "next/navigation";
import Footer from "@/shared/ui/layouts/footer/footer";
import SystemPlaceSchema from "@/entities/system-distribution/schema/SystemPlaceSchema";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import ProductSchema from "@/shared/schema/product";
import EventsSchema from "@/shared/schema/events";

const SystemMapAndSliders = dynamic(
    () => import("@/entities/system-distribution/ui/system-map-and-sliders"),
    {ssr: true}
)
const SystemLatestReviews = dynamic(
    () => import("@/entities/system-distribution/ui/system-latest-reviews"),
    {ssr: true}
)
const SystemCityRows = dynamic(
    () => import("@/entities/system-distribution/ui/system-city-rows"),
    {ssr: true}
)
const SystemGuides = dynamic(
    () => import("@/entities/system-distribution/ui/system-guides"),
    {ssr: true}
)
const SystemSsrCalendar = dynamic(
    () => import("@/entities/system-distribution/ui/system-calendar"),
    {ssr: true}
)
const BannerSystem = dynamic(
    () => import("@/entities/system-distribution/ui/system-banner"),
    {ssr: true}
)
const SystemToursBox = dynamic(
    () => import("@/entities/system-distribution/ui/system-tours-box"),
    {ssr: true}
)
const FLEXIBLE_CONTENT = {
    map_places: SystemMapAndSliders,
    reviews: SystemLatestReviews,
    cities: SystemCityRows,
    guides: SystemGuides,
    calendar: SystemSsrCalendar,
    banner: BannerSystem,
    tours_box: SystemToursBox,
};
export default async function PageSystem({ slug, locale }) {
    const page = await getPageBySlug(process.env.NEXT_PUBLIC_SYSTEM_HOSTING, slug, locale);
    if (page.statusCode === 404) {
        notFound();
    }
    const i18n = await useDefaultI18n(locale);
    const languages = page?.slugs.filter(slug => slug.published).map(slug => ({
        ...slug,
        title: slug.title,
        slug: slug.slug,
    }))
    const pageTitle = page.titles.find(item => item.locale === locale);

    let breadcrumbsTitle = i18n.t("Free Walking Tour Breadcrumbs");
    breadcrumbsTitle = breadcrumbsTitle.replace(" Breadcrumbs", "");

    return (
        <main>
            <SystemPlaceSchema seo={page.seo} locale={locale} image={page.image}/>
            <ProductSchema id={page.id} locale={locale} type="system"/>
            <EventsSchema id={page.id} locale={locale} type="system"/>
            {page.flexible.map(item => {
                const Component = FLEXIBLE_CONTENT[item.type]
                if(!Component) return null
                return (
                    <Component
                        key={item.key}
                        id={page.id}
                        locale={locale}
                        titles={page.titles}
                        attachment={page.image}
                        flexible={item}
                        type="system"
                    />
                )
            })}

            <I18nChangeOfLanguage languages={languages} title={pageTitle.name} locale={locale}/>
            <Breadcrumbs
                pages={[{slug: "/", title: breadcrumbsTitle}, {title: pageTitle.name}]}
                locale={locale}
            />
            <Footer locale={locale}/>
        </main>
    )
}
