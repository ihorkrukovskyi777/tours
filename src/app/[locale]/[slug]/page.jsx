import dynamic from "next/dynamic";
import {notFound} from "next/navigation";

const CityPage = dynamic(
    () => import("@/entities/city/page/city-page"),
    { ssr: true}
)
const FlexibleContent = dynamic(
    () => import("@/widgets/flexible-content/flexible-content"),
    { ssr: true}
)
export default async function Home({params: {locale, slug}}) {
    const pageType = await fetch(
        `http://localhost:9000/api/v1/page/${slug}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    return (
        <main>
            {data.type === 'city' ? <CityPage
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
                    id={data.id}
                    slug={slug}
                    languages={data.languages}
                    title={data.title}
                />
                : null}
        </main>
    )
}
