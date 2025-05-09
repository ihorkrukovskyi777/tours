import {useTranslations} from "next-intl";
import './style.css'

export interface ICivitatisCard {
    id: number,
    score: number;
    title: string;
    url: string;
    photos: {
        header: {
            caption: string;
            paths: {
                original: string;
                thumbnail: string;
                grid: string;
                list: string;
                list_responsive: string;
            };
        }[];
    };
    description: string;
    reviews: number;
}
interface Props {
    card: ICivitatisCard
}
export default function CivitatisCard({ card} : Props) {
    const t = useTranslations();
    const img = card?.photos?.header[0]?.paths?.original
    return (
        <div className="civitatis_card">
            <a target="_blank"  href={card.url+'&cmp=strawberrytours'} rel="noreferrer" className="civitatis_card__link"></a>
            <div className="civitatis_card__image">
                <img src={img} alt=""/>
            </div>

            <div className="civitatis_card__content">
                <h5>{card.title}</h5>
                <div>
                    <span className="civitatis_card__score">{card.score} / 10</span> <span className="civitatis_card__reviews">{card.reviews} {t('reviews')}</span>
                </div>
                <p className="civitatis_card__description" dangerouslySetInnerHTML={{__html: card.description}}></p>
            </div>

            <div className="civitatis_card__footer">
                <span>{t('free')}!</span>
                <div>{t('book')}</div>
            </div>
        </div>
    )
}