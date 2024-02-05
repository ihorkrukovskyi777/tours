import {notFound} from "next/navigation";
import Footer from "@/shared/ui/layouts/footer/footer";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import '@/entities/post/ui/post-content/style.css';
import './style.css'
export default async function CancelPage({params: {locale}, searchParams}) {
    let cancelBook = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/cancel-booking`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: searchParams.cancelCode,
                lang: locale,
            }),
            next: {revalidate: 0}
        }
    )

    cancelBook = await cancelBook.json();
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
            <div className="container">
                <div className="content cancel-book">
                    <p className={'canceled'} dangerouslySetInnerHTML={{__html: cancelBook?.message ?? ''}}></p>
                </div>
            </div>
            <I18nChangeOfLanguage locale={locale} languages={data.languages}/>
            <Footer locale={locale}/>
        </>
    )
}
