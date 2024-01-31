import {getHighlightsImages} from "@/entities/api";
import {createTranslation } from "@/i18n/server";
import HighlightsLazySlider from "@/widgets/highlights/lazy-loading"
import './style.css';

export default async function Highlights({id}) {
    const { t } = await createTranslation();
    const images = await getHighlightsImages(id);
    return (
        <section className="highlights">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{t('Highlights of your trip!')}</h2>
                    <HighlightsLazySlider images={images} />
                </div>
            </div>

        </section>

    )
}
