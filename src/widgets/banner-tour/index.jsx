import Banner from '@/shared/ui/banner';
import Reviews from '@/shared/ui/reviews/reviews';
import LanguageImages from '@/shared/ui/language-images';
import Hours from '@/shared/ui/hours';
import Image from 'next/image';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';
import ClockSvg from '@/assets/images/svg/clock-svg';
import './style.css';



const languagesAll = [DefaultImage , DefaultImage , DefaultImage];
export default function BannerTour({title , size}) {

  return (
    <Banner title={title} size={size} bottomView={<Reviews rating={4.3} count_reviews={230}/>}>
            <LanguageImages data={languagesAll} />
            <div className="time_wrapper">
                <Hours time="6 hours">
                <ClockSvg/>
                </Hours>
            </div>
    </Banner>
  )
}
