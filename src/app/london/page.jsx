import BannerCity from "@/widgets/banner-city"
import MostPopularTours from "@/widgets/most-popular-tours"
import LatestReviews from "@/widgets/latest-reviews"
import Highlights from "@/widgets/highlights"
import TextBlocks from "@/widgets/text-blocks"
import Guides from "@/widgets/guides"
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language"
import TextQuote from "@/widgets/text-quote"
import MostPopularCity from "@/widgets/most-popular-city"


export default function Home() {
  return (
    <main>
        <BannerCity title="Free Walking Tour London" size="city_banner"/>
        <MostPopularTours/>
        <TextQuote />
        <LatestReviews/>
        <Highlights />
        <TextBlocks />
        <Guides/>
        <MostPopularCity />
        <ChangeOfLanguage />
    </main>
  )
}
