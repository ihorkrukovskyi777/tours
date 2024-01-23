import Banner from '@/shared/ui/banner';
import BannerButtons from "@/entities/city/ui/banner-buttons/banner-buttons";
import Reviews from '@/widgets/latest-reviews/item/reviews';
import {getBannerData} from "@/entities/api";
import './style.css';


export default async function BannerCity({ id, locale, size, isMobile = false}) {
    const {attachment, title, rating, reviews} = await getBannerData(id, locale)

    return (
        <Banner isMobile={isMobile} title={title} attachment={null} size={size} bottomView={<Reviews rating={rating} count_reviews={reviews} title={'banner city'}/>}>
            <p className="pick_text">Pick a Date!</p>
            <div className="flex-row">
                <BannerButtons/>
            </div>
        </Banner>
    )
}

