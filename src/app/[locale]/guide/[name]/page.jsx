import {notFound} from "next/navigation";
import {fetchSubVendorBySlug} from "@/entities/guide/api";
import BannerGuide from "@/entities/guide/ui/banner-guide";
import GuideTours from "@/entities/guide/ui/guide-tours/guide-tours";
import SsrCalendar from "@/entities/calendar/ssr-calendar";

export default async function PageGuide({params: { name, locale }} ) {
    const id = await fetchSubVendorBySlug(name);

    if (id?.statusCode === 404) {
        notFound();
    }

    return (
        <>
            <BannerGuide id={id}/>
            <GuideTours id={id} locale={locale}/>
            <SsrCalendar locale={locale} type="sub-vendor" id={id}/>
        </>
    )
}
