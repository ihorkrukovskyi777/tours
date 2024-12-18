import {allGuides} from '@/entities/api';
import dynamic from "next/dynamic";

const LazyGuidesRow = dynamic(
    () => import("@/shared/ui/guides/lazy-guides-row"),
    {ssr: false}
)

export default async function Guides({title, id, locale, type}) {
    const data = await allGuides(id, type, locale);
    if (!data.subVendors?.length) {
        return null
    }
    return (
        <>
            <section className="guides_section">
                <div className="container">
                    <h2>{title} </h2>
                    <LazyGuidesRow guides={data.subVendors}/>
                </div>
            </section>
        </>
    )
}
