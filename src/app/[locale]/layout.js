import Header from '@/shared/ui/layouts/header/header'
import {seoLocales} from "@/shared/constants/locales-seo";
import WebSiteSchema from "@/shared/schema/web-site";
import GoogleScript from "@/shared/scripts/google";
import NextTopLoader from 'nextjs-toploader';
import '../../globals.css'
export default async function LocaleLayout({children, params}) {


    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')}>

            <body>
            <main className={"main_flex_container"}>
                <NextTopLoader color="var(--main_color)"/>
                <WebSiteSchema />
                <Header locale={params.locale}/>
                {children}
                <GoogleScript />
            </main>
            </body>
            </html>
        </>
    )
}
