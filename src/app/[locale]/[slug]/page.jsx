import dynamic from "next/dynamic";
import {isMobileCheck} from "@/shared/helpers";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import {createTranslation} from "@/i18n/server";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/generator-seo";
import {getHrefLocale} from "@/i18n/get-href-locale";

const CityPage = dynamic(
    () => import("@/entities/city/page/city-page"),
    {ssr: true}
)
const PostPage = dynamic(
    () => import("@/entities/post/page/post-page"),
    {ssr: true}
)
const FlexibleContent = dynamic(
    () => import("@/widgets/flexible-content"),
    {ssr: true}
)

export default async function Page({params: {locale, slug }}) {

    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));

    const { t } = await createTranslation(locale)
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const data = await pageType.json();

    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }

    return (
        <main id={data.id}>
            {data.type === 'city' ?
                <CityPage
                    isMobile={isMobile}
                    locale={locale}
                    slug={slug}
                    id={data.id}
                    languages={data.languages}
                    title={data.title}/>
                : null}
            {data.type === 'default' ?
                <FlexibleContent
                    flexibleContent={data.flexibleContent}
                    locale={locale}
                    id={data.translateId}
                    slug={slug}
                    content={data.content}
                    languages={data.languages}
                    title={t('Free Tours')}
                />
                : null}

            {data.type === 'post' ?
                <PostPage
                    locale={locale}
                    id={data.translateId}
                    slug={slug}
                    languages={data.languages}
                    title={data.title}
                />
                : null}

        </main>
    )
}


export async function generateMetadata({ params : {slug, locale} }) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/${slug}?locale=${locale}`, {next: { revalidate: 0 }}).then((res) => res.json())
    const languages = {};

    if(Array.isArray(seo.languages)) {
        for (const lang of seo.languages) {
            if(lang.locale === locale) {
                continue;
            }
            languages[lang.locale] = [{title: lang.title, url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(lang.locale, lang.slug)}`}]
        }
    }
    const canonical = locale === fallbackLng ? slug : `${locale}/${slug}`
    return generatorSeo(seo, canonical, locale, languages)
}