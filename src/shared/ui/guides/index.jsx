import {allGuides} from '@/entities/api';
import i18n from "@/i18n";
import {hrefSubVendor} from "@/shared/helpers/url";
import Link from "next/link";
import dynamic from "next/dynamic";
const LazyGuidesRow = dynamic(
    () => import("@/shared/ui/guides/lazy-guides-row"),
    {ssr: false}
)
import './style.css';

export default async function Guides({title, id, locale, type}) {
    const items = await allGuides(id, type);
    await i18n.getFetchDefault();
    if (!items?.length) {
        return null
    }
    return (
        <>
            <section className="guides_section">
                <div className="container">
                    <h2>{i18n.t('Your Guides in')} {title}</h2>
                    <LazyGuidesRow guides={items}/>
                    <div style={{display: 'none'}} id="hidden_mirage_guide">
                        {items.map(item => {
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
