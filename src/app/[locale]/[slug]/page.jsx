import dynamic from "next/dynamic";
import Loader from "@/shared/ui/loaders/default-loader";
import {notFound} from "next/navigation";

const CityPage = dynamic(
    () => import("@/entities/city/page/city-page"),
    {
        ssr: true,
        loading: () => {
            return (
                <div className="calendar_wrap" style={{position: 'relative', minHeight: '300px'}}>
                    <Loader style={{backgroundColor: 'inherit'}}/>
                </div>
            )
        }
    }
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
    console.log(data, 'dsadsa')

    return (
        <main>
            {data.type === 'city' ? <CityPage
                    locale={locale}
                    slug={slug}
                    id={data.id}
                    languages={data.languages}
                    title={data.title}/>
                : null}
            {data.type === 'default' ? 'default page' : null}
        </main>
    )
}
