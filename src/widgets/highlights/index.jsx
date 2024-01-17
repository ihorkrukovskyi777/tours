import IcloudImage from "@/shared/ui/icloud-image";
import {getHighlightsImages} from "@/entities/api";
import {createTranslation } from "@/i18n/server";
import './style.css';

export default async function Highlights({id}) {
    const { t} = await createTranslation();
    const images = await getHighlightsImages(id);
    return (
        <section className="highlights">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{t('Highlights of your trip!')}</h2>
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            {images.map(({src, alt}) => {
                                return (
                                    <div key={src} className="swiper-slide">
                                        <IcloudImage src={src} alt={alt} width={350} height={220}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}
