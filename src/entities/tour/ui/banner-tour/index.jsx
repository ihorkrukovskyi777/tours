import Banner from 'src/shared/ui/banner';
import Reviews from '@/widgets/latest-reviews/item/reviews';
import LanguageImages from 'src/shared/ui/languages/language-images';
import Hours from 'src/shared/ui/time/hours';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';
import ClockSvg from '@/assets/images/svg/clock-svg';
import {getBannerData} from "@/entities/api";
import './style.css';
import {notFound} from "next/navigation";


const languagesAll = [DefaultImage, DefaultImage, DefaultImage];
export default async function BannerTour({id, locale}) {
    const tour = await getBannerData(id, locale, 'tour')

    return (
        <Banner title={tour.title} attachment={tour.attachment} size="tour_banner" bottomView={<Reviews rating={tour?.rating?.rating ?? 0} count_reviews={tour?.rating?.reviews ?? 0}/>}>
            <LanguageImages locales={tour.departure.locales}/>
            <div className="time_wrapper">
                {tour?.departure?.durations?.length ?
                    <div>
                        <span>{tour.departure.durations.join('-')} Hours</span>
                        <ClockSvg/>
                    </div>
               : null}
            </div>
        </Banner>
    )
}
