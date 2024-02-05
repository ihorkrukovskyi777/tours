import Header from '@/shared/ui/layouts/header/header'
import {seoLocales} from "@/shared/constants/locales-seo";
import WebSiteSchema from "@/shared/schema/web-site";
import i18n from "@/i18n";
import GoogleScript from "@/shared/scripts/google";
import localFont from 'next/font/local'
import '../../globals.css'
import classNames from "classnames";

const brandBold = localFont({
    src: '../../assets/fonts/brandon-grotesque/BrandonGrotesque-Bold.woff2',
    variable: '--font-brand-bold',
    display: 'swap'
})
const brandMedium = localFont({
    src: '../../assets/fonts/brandon-grotesque/BrandonGrotesque-Medium.woff2',
    variable: '--font-brand-medium',
    style: 'normal',
    display: 'swap'
})
const brandRegular = localFont({
    src: '../../assets/fonts/brandon-grotesque/BrandonGrotesque-Regular.woff2',
    variable: '--font-brand-regular',
    style: 'normal',
    display: 'swap'
})

const carlitoRegular = localFont({
    src: '../../assets/fonts/carlito/Carlito-Regular.woff2',
    variable: '--font-ciliric',
    style: 'normal',
    display: 'swap'
})
const GeomanistLight = localFont({
    src: '../../assets/fonts/geomanist/Geomanist-Light.woff2',
    variable: '--geomanist_light',
    style: 'normal',
    display: 'swap'
})
const GeomanistRegular = localFont({
    src: '../../assets/fonts/geomanist/Geomanist-Regular.woff2',
    variable: '--geomanist_regular',
    style: 'normal',
    display: 'swap'
})
const GeomanistMeduim = localFont({
    src: '../../assets/fonts/geomanist/Geomanist-Medium.woff2',
    variable: '--geomanist_medium',
    style: 'normal',
    display: 'swap'
})
const GeomanistBold = localFont({
    src: '../../assets/fonts/geomanist/Geomanist-Bold.woff2',
    variable: '--geomanist_bold',
    style: 'normal',
    display: 'swap'
})
export default async function LocaleLayout({children, params}) {
    i18n.init(params.locale)

    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')} className={classNames(
                brandBold.variable,
                brandMedium.variable,
                brandRegular.variable ,
                carlitoRegular.variable ,
                GeomanistLight.variable,
                GeomanistRegular.variable,
                GeomanistMeduim.variable,
                GeomanistBold.variable
            )}>

            <body>
            <main className={"main_flex_container"}>
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
