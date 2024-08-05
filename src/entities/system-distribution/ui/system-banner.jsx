import Banner from '@/shared/ui/banner';
import BannerButtons from "@/entities/city/ui/banner-buttons/banner-buttons";
import Reviews from '@/widgets/latest-reviews/item/reviews';
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {getSystemPageRating} from "@/entities/system-distribution/api";
import '../../city/ui/banner-city/style.css';


const getContentFlexible = (flexible, locale) => {
    const page = flexible.pageMeta?.find(item => item.locale === locale);

    const global =  flexible.globalMeta?.find(item => item.locale === locale);

    return {
        title: page?.title?.trim() || global?.title,
        image: page?.image
    }


}
export default async function SystemBanner({id, locale ,isMobile, titles, attachment, flexible}) {
    const i18n = await useDefaultI18n(locale);
    const rating = await getSystemPageRating(id)
    const pageTitle = titles.find(item => item.locale === locale)
    const { title , image } = getContentFlexible(flexible, locale)


    const mainImage = { ...attachment, alt: attachment?.alt.find(item => item.locale === locale)?.value ?? ''}
    return (
            <Banner
                isMobile={isMobile}
                title={pageTitle?.name ?? ''}
                attachment={image || mainImage}
                size='city_banner'
                bottomView={<Reviews rating={rating.rating} count_reviews={rating.reviews} title={i18n.t('Reviews')}/>}
            >
                <p className="pick_text pick_text--md">{title}</p>
                <div className="flex-row">
                    <BannerButtons i18n={{today: i18n.t('Today'), tomorrow: i18n.t('Tomorrow')}} />
                </div>
            </Banner>
    )
}

