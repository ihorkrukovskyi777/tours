import MostPopularCity from '@/widgets/most-popular-city'
import MostPopularTours from '@/widgets/most-popular-tours';
import Faqs from '@/widgets/faqs/faqs'
import ChangeOfLanguage from '@/widgets/change-of-language/change-of-language'
import BannerHome from '@/widgets/banner-home/banner-home';
import BannerCity from '@/widgets/banner-city';
import BannerTour from '@/widgets/banner-tour';
import BannerGuide from '@/widgets/banner-guide';
import LatestReviews from '@/widgets/latest-reviews';
import Highlights from '@/widgets/highlights';
import TextBlocks from '@/widgets/text-blocks';
import Guides from '@/widgets/guides';

export default function Home({ params: { locale }}) {
  return (
    <main>
      <BannerHome title="Free Walking Tours Worldwide" size="home_banner"/>
      <BannerCity title="Free Walking Tour Bogota" size="city_banner"/>
      <BannerTour title="Free Jack the Ripper Tour London" size="tour_banner"/>
      <BannerGuide title="banner Guide" size="guide_banner"/>
      <MostPopularCity/>
      <MostPopularTours/>
      <Faqs />
      <LatestReviews />
      <Highlights />
      <TextBlocks />
      <Guides />

      <ChangeOfLanguage />
    </main>
  )
}
