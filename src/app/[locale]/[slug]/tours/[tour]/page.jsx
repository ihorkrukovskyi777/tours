import {Suspense} from "react";
import BannerTour from "@/entities/tour/ui/banner-tour";
import {notFound} from "next/navigation";
import {headers} from "next/headers";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import Guides from "@/shared/ui/guides";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import {createTranslation} from "@/i18n/server";
import TextAndSliderTourPage from "@/entities/tour/ui/text-and-slider-tour-page";
import {isMobileCheck} from "@/shared/hepers";
import dynamic from "next/dynamic";
import {PATH_TOURS} from "@/shared/constants/route";
const ChangeOfLanguage = dynamic(
    () => import("@/shared/ui/languages/change-of-language/change-of-language"),
    {ssr: false}
)
export default async function Page({params: {locale, slug, tour}}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/${slug}/tours/${tour}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const page = await data.json();
    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    const { t } = await createTranslation()
    if (page.statusCode === 404) {
        notFound();
    }
    return (
        <main>
            <Suspense fallback={''}>
                <BannerTour locale={page.locale} id={page.id} isMobile={isMobile}/>
                <TextAndSliderTourPage id={page.id} locale={page.locale} isMobile={isMobile}/>
            </Suspense>
            <Suspense fallback={''}>
                <SsrCalendar locale={page.locale} type="tour" id={page.id}/>
                <Guides title={t('this Tour')} id={page.id} locale={page.locale} type="tour"/>
                <Breadcrumbs title={`${page.city.title} ${page.title}`} locale={locale} />
                <ChangeOfLanguage languages={page.languages?.map(item => ({...item, slug: `${page.city.slug}/${PATH_TOURS}/${item.slug}`}))} title={page.title}/>
            </Suspense>
        </main>
    )
}
