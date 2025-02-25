import Image from "next/image";
import Link from "next/link";
import IcloudImage from "@/bokun-widget/src/ui/image/cloudflaer-image";
import SwiperBlock from "@entities/paid-tour/ui/swiper-block";
import Languages from "@entities/paid-tour/ui/languages";
import { getTranslations} from "next-intl/server";
import {CardExperience} from "@entities/paid-tour/@types";
import {getHrefLocale} from "@i18n/get-href-locale";
import {PATH_TOURS} from "@shared/constants/route";

import ImageClock from '@/assets/images/svg/paid/clock.svg';

import './styles/card-language.scss';


interface Props {
    experience: CardExperience
}

const CardLanguage = async ({experience}: Props) => {
    const t = await getTranslations()

    const duration = experience.duration ?? 0;
    const days = Math.trunc(duration / 24);
    const hours = duration % 24;

    const getLabelDuration = () => {
        if(days > 0 && hours > 0) {
            return `${days} ${t('days', {count: days})} ${t('and')} ${parseFloat((hours)?.toFixed(2))} ${t('hours', {count: duration})}`
        } else if (days > 0 && hours === 0) {
            return `${days} ${t('days', {count: days})}`
        }
        return `${parseFloat((hours)?.toFixed(2))} ${t('hours', {count: duration})}`

    }
    return (
        <div className="card_language">
            <Link href={`${getHrefLocale(experience.locale)}${experience.city?.slug}/${PATH_TOURS}/${experience.slug}`}>
                <div className="card_language__slider">
                    <SwiperBlock
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={false}
                        padding={'0'}
                        pagination={true}
                       slidesMD={1
                    }>
                        {[experience.image, ...experience.photos]
                            .filter(photo => !!photo.src)
                            .map(image => <IcloudImage key={image.src} image={image} width={500} height={500}/>)}
                    </SwiperBlock>
                </div>

                <div className="card_language__info_bottom">
                    <p>{experience.title}</p>

                    <div className="card_language__info_bottom__wrap">
                        <div className="flex flex__row-bt">
                            <div className="flex flex__row-center flex__gap_4">
                                <Image src={ImageClock as string} alt=''/>
                                <span>{getLabelDuration()}</span>
                            </div>
                            <div className="flex flex__row-center flex__gap_4">
                                <span>{t('from')} {experience.price.amount} {experience.price.currency}</span>
                            </div>
                        </div>
                        <div className="languages">
                            <Languages hieroglyph={true} languages={experience.bokun.locales}/>
                        </div>
                    </div>
                </div>
            </Link>


        </div>
    )
}

export default CardLanguage;