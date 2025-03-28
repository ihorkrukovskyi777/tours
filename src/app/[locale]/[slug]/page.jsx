import dynamic from "next/dynamic";
import {isMobileCheck} from "@/shared/helpers";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import generateSeoPage from "@/shared/helpers/seo/generate-seo-page";

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
    if(slug === 'guide') {
        notFound();
    }
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));

    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/${slug}?locale=${locale}`,
        {next: {revalidate: 0,  tags: ['page']}}
    )
    const data = await pageType.json();

    if (data.statusCode === 404 || typeof data.id !== 'number' || ['tour-page', 'tours'].includes(slug)) {
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
        </main>
    )
}


export async function generateMetadata({ params : {slug, locale} }) {
    return generateSeoPage(slug, locale);
}