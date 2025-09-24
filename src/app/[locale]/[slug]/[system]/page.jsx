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
import {fallbackLng} from "@/i18n/settings";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {seoLocales} from "@/shared/constants/locales-seo";

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
export default async function PageSystem({params}) {
    const slug = `${params.system}/${params.slug}`
    const locale = params.locale
    const page = await getPageBySlug(process.env.NEXT_PUBLIC_SYSTEM_HOSTING, slug, params.locale);
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
                if (!Component) return null
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

export async function generateMetadata({params: {slug, locale, system}}) {

        const systemPage = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/seo/${system}/${slug}?locale=${locale}&host=${process.env.NEXT_PUBLIC_SYSTEM_HOSTING}`, {next: {revalidate: 0}})
        const isIndexation = process.env.NEXT_PUBLIC_GOOGLE_INDEXATION === 'yes';

        try {
            const page = await systemPage.json();
            const seo = page.data.seo.locales.find(item => item.locale === locale);
            const canonical = seo ? `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(seo.locale, seo.slug)}` : undefined;
            const languages = {};

            if (Array.isArray(page.data.slugs)) {
                for (const slug of page.data.slugs) {

                    if (!slug.published) continue

                    if (slug.locale === fallbackLng) {
                        languages['x-default'] = [{url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(slug.locale, slug.slug)}`}]
                    }

                    const find = page.data.titles.find(item => item.locale === slug.locale)
                    languages[seoLocales[slug.locale] ?? fallbackLng] = [{
                        title: find.title,
                        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(slug.locale, slug.slug)}`
                    }]

                }
            }

            return {
                metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_DOMAIN),
                robots: {
                    index: isIndexation,
                    follow: isIndexation,
                    'max-image-preview': true,
                    'max-snippet': -1,
                    'max-video-preview': -1
                },
                title: seo.title,
                description: seo.description,
                verification: {
                    google: isIndexation ? 'mQKRBl_GbVi0Ly3Xwl9-M1pVM5Jm5y1O9Koi7Pj54M8' : '',
                },
                alternates: {
                    canonical,
                    languages,
                }
            }
        } catch (err) {
            return {}
        }
}