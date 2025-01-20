import {notFound} from "next/navigation";
import {headers} from "next/headers";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import {isMobileCheck} from "@/shared/helpers";
import {PATH_TOURS} from "@/shared/constants/route";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/seo/generator-seo";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import dynamic from "next/dynamic";

const OneportTours = dynamic(
    () => import("@/app/[locale]/[slug]/tours/[tour]/oneport-tours"),
    {ssr: true}
)
const PaidTour = dynamic(
    () => import("@/app/[locale]/[slug]/tours/[tour]/paid-tour"),
    {ssr: true}
)
export default async function Page({params: {locale, slug, tour}}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/${slug}/tours/${tour}?locale=${locale}`,
        {next: {revalidate: 0, tags: ["page"]}}
    );
    const page = await data.json();
    const headerList = headers();
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    const i18n = await useDefaultI18n(locale);
    if (page.statusCode === 404) {
        notFound();
    }

    const languages = page.languages
        ?.map((item) => {
            let city = page.cityLanguages.find((city) => city.locale === item.locale);
            if (!city?.slug) {
                city = page.cityLanguages.find((city) => city.locale === fallbackLng);
            }

            if (!city?.slug) return null;
            return {...item, slug: `${city.slug}/${PATH_TOURS}/${item.slug}`};
        })
        .filter(Boolean);
    let breadcrumbsTitle = i18n.t("Free Tour Breadcrumbs");
    breadcrumbsTitle = breadcrumbsTitle.replace("Breadcrumbs", "");
    const pagesBreadcrumbs = [
        {slug: "", title: breadcrumbsTitle},
        {
            slug: page.city.slug,
            title: `${i18n.t("Free Tour")} ${page.city.title}`,
        },
        {title: page.title},
    ];

    const type = page.type;
    console.log(page, 'languages')
    return (
        <>
            {
                type === 'free' && <OneportTours
                    languages={languages}
                    isMobile={isMobile}
                    page={page}
                    locale={locale}
                    i18n={i18n}
                    pagesBreadcrumbs={pagesBreadcrumbs}
                />
            }
            {
                type === 'paid' && <PaidTour id={page.defaultId} slug={slug}/>
            }
        </>

    );
}

export async function generateMetadata({params: {slug, locale, tour}}) {
    const seo = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/type/tour/${slug}/${tour}?locale=${locale}`,
        {next: {revalidate: 60 * 60, tags: ["seo"]}}
    ).then((res) => res.json());
    const languages = {};
    if (Array.isArray(seo.languages)) {
        for (const lang of seo.languages) {
            if (lang.locale === fallbackLng) {
                languages['x-default'] = [{
                    url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(
                        lang.locale,
                        `${lang.citySlug}/${PATH_TOURS}/${lang.slug}`
                    )}`
                }]
            }
            languages[lang.locale] = [
                {
                    title: lang.title,
                    url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(
                        lang.locale,
                        `${lang.citySlug}/${PATH_TOURS}/${lang.slug}`
                    )}`,
                },
            ];
        }
    }
    const canonical =
        locale === fallbackLng
            ? `${slug}/${PATH_TOURS}/${tour}`
            : `${locale}/${slug}/${PATH_TOURS}/${tour}`;
    return generatorSeo(seo, canonical, locale, languages);
}
