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
import AnalyticsProvider from "@/entities/analytics/analytics.provider";

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1,
    userScalable: false,
    // Also supported but less commonly used
    // interactiveWidget: 'resizes-visual',
}
export default function LocaleLayout({children, params}) {

    const messages = use(getMessages());
    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')}>

            <body>
            <main className={"main_flex_container"}>
                <NextTopLoader color="var(--main_color)"/>
                <WebSiteSchema/>
                <NextIntlClientProvider messages={messages}>
                    <Header locale={params.locale}/>
                    <AnalyticsProvider>
                        {children}
                    </AnalyticsProvider>
                    <GoogleScript/>
                </NextIntlClientProvider>
            </main>
            </body>
            </html>
        </>
    )
}
