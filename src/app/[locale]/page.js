import {notFound} from "next/navigation";

import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";
import Footer from "@/widgets/footer/footer";

export default async function Home({params: {locale}}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const data = await pageType.json();
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    const {languages, title} = data;

    return (
        <>
            <ChangeOfLanguage languages={languages.map(lang => ({...lang, slug: ''}))} title={title}/>
            <Footer locale={locale}/>
        </>
    )
}
