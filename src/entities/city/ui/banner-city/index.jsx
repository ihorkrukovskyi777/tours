import Banner from '@/shared/ui/banner';
import BannerButtons from "@/entities/city/ui/banner-buttons/banner-buttons";
import Reviews from '@/widgets/latest-reviews/item/reviews';
import {getBannerData} from "@/entities/api";
import i18n from "@/i18n/server-locales";
import './style.css';


export default async function BannerCity({id, locale, size, isMobile = false, pageTitle = null}) {
    await i18n.getFetchDefault();
    const {attachment, title, rating, reviews} = await getBannerData(id, locale, 'city', 60 * 10)

    let titleAndCity = title ?? '';
    if(typeof pageTitle === 'string' && !titleAndCity?.toLowerCase()?.includes(pageTitle?.toLowerCase())) {
        titleAndCity = titleAndCity + ' ' + pageTitle;
    }
    return (
        <Banner
            isMobile={isMobile}
            title={titleAndCity}
            attachment={attachment}
            size={size}
            bottomView={<Reviews rating={rating} count_reviews={reviews} title={i18n.t('Reviews')}/>}
        >
            <p className="pick_text">{i18n.t('Pick a Date!')}</p>
            <div className="flex-row">
                <BannerButtons i18n={{today: i18n.t('Today'), tomorrow: i18n.t('Tomorrow')}} />
            </div>
        </Banner>
    )
}

