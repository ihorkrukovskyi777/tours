import dynamic from "next/dynamic";
import {isMobileCheck} from "@/shared/helpers";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";
import {seoLocales} from "@/shared/constants/locales-seo";
import {fallbackLng} from "@/i18n/settings";
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
const SystemPage = dynamic(
    () => import("@/entities/system-distribution/page"),
    {ssr: true}
)

export default async function Page({params: {locale, slug}}) {
    if (slug === 'guide') {
        notFound();
    }
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));

    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
        {next: {revalidate: 60, tags: ['page']}}
    )
    const data = await pageType.json();

    if (['tour-page', 'tours'].includes(slug)) {
        notFound();
    }


    return (
        <main id={`page-id-${data.id}`}>
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
                    title={'Free Tours'}
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

            {data.statusCode === 404 ? <SystemPage slug={slug} locale={locale}/> : null}

        </main>
    )
}


export async function generateMetadata({params: {slug, locale}}) {
    try {
        const systemPage = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/seo/${slug}?locale=${locale}`, {next: { revalidate: 60 }})
        const isIndexation = process.env.NEXT_PUBLIC_GOOGLE_INDEXATION === 'yes';


        if(systemPage.status === 404) {
            return generateSeoPage(slug, locale);
        } else {

            const page = await systemPage.json();
            const seo = page.data.seo.locales.find(item => item.locale === locale);
            const canonical = locale === fallbackLng ? slug : `${locale}/${slug}`
            const languages = {};

            if(Array.isArray(page.data.slugs)) {
                for (const slug of page.data.slugs) {

                    if(!slug.published) continue

                    if(slug.locale === fallbackLng) {
                        languages['x-default'] = [{ url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(slug.locale, slug.slug)}`}]
                    }

                    const find = page.data.titles.find(item => item.locale === slug.locale)
                    languages[seoLocales[slug.locale] ?? fallbackLng] = [{title: find.title, url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(slug.locale, slug.slug)}`}]

                }
            }

            return {
                metadataBase: new URL(process.env.NEXT_PUBLIC_CANONICAL_DOMAIN),
                robots: {index: isIndexation, follow: isIndexation, 'max-image-preview': true, 'max-snippet': -1, 'max-video-preview': -1},
                title: seo.title,
                description:seo.description,

                verification: {
                    google: isIndexation ? 'mQKRBl_GbVi0Ly3Xwl9-M1pVM5Jm5y1O9Koi7Pj54M8' : '',
                },
                alternates: {
                    canonical,
                    languages,
                }
            }
        }
    } catch (err) {
        console.log(err)
    }

}