import BannerTour from "@/widgets/banner-tour"
import TextAndSlider from "@/widgets/text-and-slider"
import TextBlocks from "@/widgets/text-blocks"
import Guides from "@/widgets/guides"
import OtherTours from "@/widgets/other-tours"
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language"
import Breadcrumbs from "@/shared/ui/breadcrumbs"


export default function Home() {
  return (
    <main>
        <BannerTour title="Free London by the Thames Tour" size="tour_banner"/>
        <TextAndSlider/>
        <TextBlocks/>
        <Guides/>
        <OtherTours/>
        <ChangeOfLanguage/>
        <Breadcrumbs>
          <p id="breadcrumbs">
              <span>
                  <span>
                      <a className="first_link" href="http://dev.oneporttest.com">Free Tour </a>
                      <span className="arrow-right-b"> - </span>
                      <span>
                          <span className="breadcrumb_last" aria-current="page">London</span>
                      </span>
                  </span>
              </span>
          </p>
        </Breadcrumbs>

    </main>
  )
}
