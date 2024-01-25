import {notFound} from "next/navigation";
import dynamic from "next/dynamic";
import {createTranslation} from "@/i18n/server";
const FlexibleContent = dynamic(
    () => import("@/widgets/flexible-content"),
    {ssr: true}
)
export default async function Home({params: {locale}, ...props}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const { t } = await createTranslation()
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    const {languages} = data;
    return (
        <>
            <FlexibleContent {...data} title={t('Free Tours')}  id={data.translateId} locale={locale} {...props} languages={languages.map(lang => ({...lang, slug: '', }))}/>
        </>
    )
}
