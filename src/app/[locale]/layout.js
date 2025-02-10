import {use} from "react";
import Header from '@/shared/ui/layouts/header/header'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {seoLocales} from "@/shared/constants/locales-seo";
import WebSiteSchema from "@/shared/schema/web-site";
import GoogleScript from "@/shared/scripts/google";
import NextTopLoader from 'nextjs-toploader';
import '../../globals.css'
import '../../layout.scss'

export default function LocaleLayout({children, params}) {

    const messages = use(getMessages());
    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')}>

            <body>
            <main className={"main_flex_container"}>
                <NextTopLoader color="var(--main_color)"/>
                <WebSiteSchema/>
                <NextIntlClientProvider  messages={messages}>
                    <Header locale={params.locale}/>
                    {children}
                    <GoogleScript/>
                </NextIntlClientProvider>
            </main>
            </body>
            </html>
        </>
    )
}
