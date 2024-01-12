import Link from "next/link";
import BannerCity from "@/widgets/banner-city"
import MostPopularTours from "@/widgets/most-popular-tours"
import LatestReviews from "@/widgets/latest-reviews"
import Highlights from "@/widgets/highlights"
import TextBlocks from "@/widgets/text-blocks"
import Guides from "@/widgets/guides"
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language"
import TextQuote from "@/widgets/text-quote"
import MostPopularCity from "@/widgets/most-popular-city"
import Breadcrumbs from "@/shared/ui/breadcrumbs"
import {createTranslation} from "@/i18n/server";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import IcloudImage from "@/shared/ui/icloud-image";
export default async function Home({params: {locale}}) {
    const {t} = await createTranslation(locale);
    return (
        <main>
            <BannerCity title="Free Walking Tour London" size="city_banner"/>
            <SsrCalendar locale={locale} type="city" id={1031}/>
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
                      <Link className="first_link" href="/">Free Tour </Link>
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
