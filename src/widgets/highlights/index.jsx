import {getHighlightsImages} from "@/entities/api";
import dynamic from "next/dynamic";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
const HighlightsLazySlider = dynamic(
    () => import("@/widgets/highlights/lazy-loading"),
    {ssr: false}
)

export default async function Highlights({id, locale}) {
    const i18n = await useDefaultI18n(locale)
    const images = await getHighlightsImages(id);

    if(!images?.length) {
        return null;
    }
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
