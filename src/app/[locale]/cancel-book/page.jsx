import {notFound} from "next/navigation";
import {createTranslation} from "@/i18n/server";
import Footer from "@/shared/ui/layouts/footer/footer";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";


export default async function CancelPage({params: {locale}}) {
    const { t } = await createTranslation()
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/cancel-book/?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    return (
        <>
            <ChangeOfLanguage languages={data.languages}/>
            <Footer locale={locale}/>
        </>
    )
}
