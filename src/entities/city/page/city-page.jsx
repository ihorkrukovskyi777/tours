import BannerCity from "@/widgets/banner-city";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import MostPopularTours from "@/widgets/most-popular-tours";
import TextQuote from "@/widgets/text-quote";
import LatestReviews from "@/widgets/latest-reviews";
import Highlights from "@/widgets/highlights";
import TextBlocks from "@/widgets/text-blocks";
import Guides from "@/widgets/guides";
import MostPopularCity from "@/widgets/most-popular-city";
import ChangeOfLanguage from "@/widgets/change-of-language/change-of-language";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Link from "next/link";
import {createTranslation} from "@/i18n/server";


export default async function CityPage({locale, title, id, languages}) {
    const {t} = await createTranslation(locale);

    return (
        <>
            <BannerCity
                size="city_banner"
                locale={locale}
                id={id}
            />
            <SsrCalendar locale={locale} type="city" id={id}/>
            <MostPopularTours id={id} locale={locale}/>
            <TextQuote/>
            <LatestReviews locale={locale} id={id}/>
            <Highlights/>
            <TextBlocks/>
            <Guides/>
            <MostPopularCity locale={locale} id={id}/>
            <ChangeOfLanguage languages={languages} title={title}/>
            <Breadcrumbs>
                <p id="breadcrumbs">
              <span>
                  <span>
                      <Link className="first_link" href="/">{t('Free Tour')}</Link>
                      <span className="arrow-right-b"> - </span>
                      <span>
                          <span className="breadcrumb_last" aria-current="page">{title}</span>
                      </span>
                  </span>
              </span>
                </p>
            </Breadcrumbs>
        </>
    )
}
