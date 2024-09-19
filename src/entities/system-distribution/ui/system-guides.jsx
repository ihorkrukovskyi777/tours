import dynamic from "next/dynamic";
import {getSystemGuides} from "@/entities/system-distribution/api";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";
const SwiperGuides = dynamic(
    () => import("@/shared/ui/guides/swiper/swiper"),
    { ssr: false }
)

export default async function SystemGuides({flexible, id, locale}) {
    const data = await getSystemGuides(id,  locale);
    if (!data.subVendors?.length) {
        return null
    }
    const { title } = getContentFlexibleTitle(flexible, locale)
    return (
        <>
            <section className="guides_section">
                <div className="container">
                    <h2>{title} </h2>
                    <SwiperGuides guides={data.subVendors}/>
                </div>
            </section>
        </>
    )
}
