import {allGuides} from '@/entities/api';
import {hrefSubVendor} from "@/shared/helpers/url";
import Link from "next/link";
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
                    <h2>{data.title ?? title}</h2>
                    <LazyGuidesRow guides={data.subVendors}/>
                    <div style={{display: 'none'}} id="hidden_mirage_guide">
                        {data.subVendors.map(item => {
                            return (
                                <div key={item.id}>
                                    <Link prefetch={false} href={hrefSubVendor(locale, item.brandName)}>{item?.brandName}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
