import BannerCity from "@/widgets/banner-city"
import MostPopularTours from "@/widgets/most-popular-tours"
import LatestReviews from "@/widgets/latest-reviews"
import Highlights from "@/widgets/highlights"
import TextBlocks from "@/widgets/text-blocks"
import Guides from "@/widgets/guides"
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language"
import TextQuote from "@/widgets/text-quote"
import MostPopularCity from "@/widgets/most-popular-city"
import TourCalendar from "../../../widgets/tour-calendar";
import Breadcrumbs from "@/shared/ui/breadcrumbs"
import {createTranslation} from "@/i18n/server";
import CalendarProvider from "@/entities/calendar/calendar-provider";


export default async function Home({params: {locale}}) {
    const {t} = await createTranslation(locale);
    return (
        <main>
            <BannerCity title="Free Walking Tour London" size="city_banner"/>
            <CalendarProvider locale={locale} type="city" id="london"/>
            {/*<TourCalendar locale={'es'} id={'paris'} type={'city'}/>*/}
            <MostPopularTours/>
            <TextQuote/>
            <LatestReviews/>
            <Highlights/>
            <TextBlocks/>
            <Guides/>
            <MostPopularCity/>
            <ChangeOfLanguage/>
            <Breadcrumbs>
                <p id="breadcrumbs">
              <span>
                  <span>
                      <a className="first_link" href="http://dev.oneporttest.com">Free Tour </a>
                      <span className="arrow-right-b"> - </span>
                      <span>
                          <span className="breadcrumb_last" aria-current="page">{t('London')}</span>
                      </span>
                  </span>
              </span>
                </p>
            </Breadcrumbs>

        </main>
    )
}
