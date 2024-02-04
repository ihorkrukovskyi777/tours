import {notFound} from "next/navigation";
import dynamic from "next/dynamic";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/generator-seo";
import CollectionPageSchema from "@/shared/schema/collection-page";
import i18n from "@/i18n";
const FlexibleContent = dynamic(
    () => import("@/widgets/flexible-content"),
    {ssr: true}
)
export default async function Home({params: {locale}, ...props}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    const {languages} = data;
    await i18n.getFetch()


    return (
        <>
            <CollectionPageSchema locale={locale}/>
            <FlexibleContent {...data}  id={data.translateId} locale={locale} {...props} languages={languages.map(lang => ({...lang, slug: '', }))}/>
        </>
    )
}
export async function generateMetadata({ params : {slug, locale} }) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/type/home?locale=${locale}`, {next: { revalidate: 0 }}).then((res) => res.json())
    const canonical = locale === fallbackLng ? slug : `${locale}`
    return generatorSeo(seo,  canonical, locale)
}