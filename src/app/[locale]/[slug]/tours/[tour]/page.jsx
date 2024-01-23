import {Suspense} from "react";
import BannerTour from "@/entities/tour/ui/banner-tour";
import {notFound} from "next/navigation";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import Guides from "@/shared/ui/guides";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default async function Page({params: {locale, slug, tour}}) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/${slug}/tours/${tour}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const page = await data.json();
    if (page.statusCode === 404) {
        notFound();
    }
    return (
        <main>
            <Suspense fallback={''}>
                <BannerTour locale={page.locale} id={page.id}/>
            </Suspense>
            <Suspense fallback={''}>
                <SsrCalendar locale={page.locale} type="tour" id={page.id}/>
            </Suspense>
            <Suspense fallback={''}>
                <Guides title={page.title} id={page.id} locale={page.locale} type="tour"/>
            </Suspense>
        </main>
    )
}
