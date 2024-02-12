import Header from '@/shared/ui/layouts/header/header'
import {seoLocales} from "@/shared/constants/locales-seo";
import WebSiteSchema from "@/shared/schema/web-site";
import i18n from "@/i18n/server-locales";
import i18nGenitive from "@/i18n/server-locales/genitive"
import GoogleScript from "@/shared/scripts/google";
import '../../globals.css'
export default async function LocaleLayout({children, params}) {
    i18n.init(params.locale)
    i18nGenitive.init(params.locale)
    return (
        <>
            <html lang={seoLocales[params.locale]?.replace('_', '-')}>

            <body>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                window.onpageshow = function(e) {
                
                    if (e.persisted) {
                
                        alert("Page shown");
                        window.location.reload();
                    }
                };

            `,
                }}
            />
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
