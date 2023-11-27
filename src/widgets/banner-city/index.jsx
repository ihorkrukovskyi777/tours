import Banner from '@/shared/ui/banner';
import Button from '@/shared/ui/button/button';
import CalendarSvg from '@/assets/images/svg/calendar_white.svg';
import Reviews from '@/shared/ui/reviews/reviews';
import './style.css';

export default function BannerCity({title , size}) {

  return (
    <Banner title={title} size={size} bottomView={<Reviews rating={2.3} count_reviews={130}/>}>
        <p className="pick_text">Pick a Date!</p>
        <div className="flex-row">
          <Button>Today</Button>
          <Button>Tomorrrow</Button>
          <Button icon={CalendarSvg}></Button>
        </div>
    </Banner>
  )
}
