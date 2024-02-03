import Header from '@/shared/ui/layouts/header/header'
import {seoLocales} from "@/shared/constants/locales-seo";
import WebSiteSchema from "@/shared/schema/web-site";
import '../../globals.css'
export default async function LocaleLayout({children, params}) {
    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')}>

            <body>
            <main className={'main_flex_container'}>
                <WebSiteSchema />
                <Header locale={params.locale}/>
                {children}
            </main>
            </body>
            </html>
        </>
    )
}
