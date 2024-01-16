import Banner from '@/shared/ui/banner';
import BannerButtons from "@/entities/city/ui/banner-buttons/banner-buttons";
import Reviews from '@/shared/ui/reviews/reviews';
import './style.css';
import {getBannerData} from "@/entities/api";

export default async function BannerCity({ id, locale, size}) {
    const {attachment, title, rating, reviews} = await getBannerData(id, locale)


    return (
        <Banner title={title} attachment={attachment} size={size} bottomView={<Reviews rating={rating} count_reviews={reviews} title={'banner city'}/>}>
            <p className="pick_text">Pick a Date!</p>
            <div className="flex-row">
                <BannerButtons/>
            </div>
        </Banner>
    )
}

