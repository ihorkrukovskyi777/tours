import {notFound} from "next/navigation";
import {Suspense} from "react";
import {createTranslation} from "@/i18n/server";
import {fetchSubVendorBySlug, getPageLanguage} from "@/entities/guide/api";
import BannerGuide from "@/entities/guide/ui/banner-guide";
import GuideTours from "@/entities/guide/ui/guide-tours/guide-tours";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import {headers} from "next/headers";
import {isMobileCheck} from "@/shared/helpers";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Footer from "@/shared/ui/layouts/footer/footer";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/generator-seo";
import {PATH_GUIDES} from "@/shared/constants/route";

export default async function PageGuide({params: {name, locale}}) {
    const [pageSub, languages] = await Promise.all([
        fetchSubVendorBySlug(name),
        getPageLanguage()
    ])

    const {t } = await createTranslation(locale)


    if (pageSub?.statusCode === 404) {
        notFound();
    }

    const languagesFormatted = languages.map(sub => ({...sub, slug: `${sub.slug}/${name}`}))
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    return (
        <>
            <Suspense fallback={''}>
                <BannerGuide id={pageSub.id} isMobile={isMobile}/>
            </Suspense>
            <Suspense fallback={''}>
                <GuideTours id={pageSub.id} locale={locale}/>
                <SsrCalendar locale={locale} type="sub-vendor" id={pageSub.id} showFaq={false}/>
                <ChangeOfLanguage languages={languagesFormatted} title={pageSub.brandName}/>
                <Breadcrumbs pages={[{slug: '/', title: t('Free Tours')}, {title: name.replaceAll('_' ,' ') }]} locale={locale} />
                <Footer locale={locale}/>
            </Suspense>
        </>
    )
}
export async function generateMetadata({ params : {name, locale} }) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/type/guide/${name}?locale=${locale}`, {next: { revalidate: 0 }}).then((res) => res.json())
    const canonical = locale === fallbackLng ? `${PATH_GUIDES}/${name}` : `${locale}/${PATH_GUIDES}/${name}`

    return generatorSeo(seo,  canonical, locale)
}