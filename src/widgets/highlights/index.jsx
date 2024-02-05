import {getHighlightsImages} from "@/entities/api";
import i18n from "@/i18n";
import dynamic from "next/dynamic";
const HighlightsLazySlider = dynamic(
    () => import("@/widgets/highlights/lazy-loading"),
    {ssr: false}
)
import './style.css';

export default async function Highlights({id}) {
    await i18n.getFetchDefault();
    const images = await getHighlightsImages(id);
    return (
        <section className="highlights">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{i18n.t('Highlights of your trip!')}</h2>
                    <HighlightsLazySlider images={images} />
                </div>
            </div>

        </section>

    )
}
