import {notFound} from "next/navigation";
import {Suspense} from "react";
import {createTranslation} from "@/i18n/server";
import {fetchSubVendorBySlug, getPageLanguage} from "@/entities/guide/api";
import BannerGuide from "@/entities/guide/ui/banner-guide";
import GuideTours from "@/entities/guide/ui/guide-tours/guide-tours";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import {headers} from "next/headers";
import {isMobileCheck} from "@/shared/hepers";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Link from "next/link";
import Footer from "@/shared/ui/layouts/footer/footer";
import {getHrefLocale} from "@/i18n/get-href-locale";

export default async function PageGuide({params: {name, locale}}) {
    const [id, languages] = await Promise.all([
        fetchSubVendorBySlug(name),
        getPageLanguage()
    ])

    const {t } = await createTranslation()


    if (id?.statusCode === 404) {
        notFound();
    }

    const languagesFormatted = languages.map(sub => ({...sub, slug: `${sub.slug}/${name}`}))
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    return (
        <>
            <Suspense fallback={''}>
                <BannerGuide id={id} isMobile={isMobile}/>
            </Suspense>
            <Suspense fallback={''}>
                <GuideTours id={id} locale={locale}/>
            </Suspense>
            <Suspense fallback={''}>
                <SsrCalendar locale={locale} type="sub-vendor" id={id} showFaq={false}/>
                <ChangeOfLanguage languages={languagesFormatted} title={name.replaceAll('_' ,' ')}/>
                <Breadcrumbs pages={[{slug: '/', title: t('Free Tours')}, {title: name.replaceAll('_' ,' ') }]} locale={locale} />
                <Footer locale={locale}/>
            </Suspense>
        </>
    )
}
