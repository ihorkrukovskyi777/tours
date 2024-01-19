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




export default function Home({ params: { locale, slug = 'front' }}) {
    console.log(locale, slug)
  return (
    <main>
        <BannerHome title="Free Walking Tours Worldwide"/>
    </main>
  )
}
