import {allGuides} from '@/entities/api';
import {createTranslation} from "@/i18n/server";

const LazyGuidesRow = dynamic(
    () => import("@/shared/ui/guides/lazy-guides-row"),
    {ssr: false}
)
import './style.css';
import dynamic from "next/dynamic";
import {hrefSubVendor} from "@/shared/hepers/url";
import FullStarSvg from "@/assets/images/svg/full-star";
import CardGuide from "@/shared/ui/card-components/card-guide";
import Link from "next/link";

export default async function Guides({title, id, locale, type}) {
    const items = await allGuides(id, type);
    const {t} = await createTranslation();

    if (!items?.length) {
        return null
    }
    return (
        <>
            <div id="guides-sliders">
                <section className="guides_section">
                    <div className="container">
                        <h2>{t('Your Guides in')} {title}</h2>
                        <LazyGuidesRow guides={items}/>
                        <div style={{display: 'none'}} id="hidden_mirage_guide">
                            {items.map(item => {
                                return (
                                    <div key={item.id}>
                                        <Link href={hrefSubVendor(locale, item.brandName)}>{item?.brandName}</Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
