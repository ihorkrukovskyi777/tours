import {notFound} from "next/navigation";
import Footer from "@/shared/ui/layouts/footer/footer";
import dynamic from "next/dynamic";
const FlexibleContent = dynamic(
    () => import("@/shared/ui/flexible-content/flexible-content"),
    {ssr: true}
)
export default async function Home({params: {locale}, ...props}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    const {languages} = data;

    return (
        <>
            <FlexibleContent {...data} locale={locale} {...props} languages={languages.map(lang => ({...lang, slug: ''}))}/>
            <Footer locale={locale}/>
        </>
    )
}
