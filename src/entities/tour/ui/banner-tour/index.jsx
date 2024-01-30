import Banner from '@/shared/ui/banner';
import Reviews from '@/widgets/latest-reviews/item/reviews';
import LanguageImages from "@/shared/ui/languages/language-images";
import ClockSvg from '@/assets/images/svg/clock-svg';
import {getBannerData} from "@/entities/api";
import './style.css';


export default async function BannerTour({id, locale, isMobile}) {
    const tour = await getBannerData(id, locale, 'tour')

    return (
        <Banner
            isMobile={isMobile}
            title={tour.title}
            attachment={tour.attachment}
            size="tour_banner"
            bottomView={<Reviews rating={tour?.rating?.rating ?? 0} count_reviews={tour?.rating?.reviews ?? 0}/>}
        >
            <LanguageImages locales={tour.departure.locales}/>
            <div className="time_wrapper">
                <ClockSvg/>
                {tour?.departure?.durations?.length ?
                    <div>
                        <span>{tour.departure.durations.join('-')} Hours</span>
                    </div>
               : null}
            </div>
        </Banner>
    )
}
