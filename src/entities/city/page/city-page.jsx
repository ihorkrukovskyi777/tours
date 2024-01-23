import {Suspense} from "react";
import BannerCity from "@/entities/city/ui/banner-city";
import SsrCalendar from "@/entities/calendar/ssr-calendar";
import MostPopularTours from "@/entities/city/ui/most-popular-tours";
import TextQuote from "@/widgets/text-quote";
import LatestReviews from "@/widgets/latest-reviews";
import Highlights from "@/widgets/highlights";
import TextBlocks from "@/widgets/text-blocks";
import Guides from "@/shared/ui/guides";
import MostPopularCity from "@/entities/city/ui/most-popular-city";
import Breadcrumbs from "@/shared/ui/breadcrumbs";
import Link from "next/link";
import {createTranslation} from "@/i18n/server";
import dynamic from "next/dynamic";


const ChangeOfLanguage = dynamic(
    () => import("@/shared/ui/languages/change-of-language/change-of-language"),
    {ssr: false}
)


export default async function CityPage({locale, title, id, languages, slug, isMobile}) {
    const {t} = await createTranslation(locale);
    return (
        <>
            <BannerCity
                isMobile={isMobile}
                size="city_banner"
                locale={locale}
                id={id}
            />
            <Suspense fallback="">
                <SsrCalendar locale={locale} type="city" id={id}/>
                <MostPopularTours id={id} locale={locale} slug={slug}/>
                <TextQuote id={id} locale={locale}/>
            </Suspense>
            <LatestReviews id={id} locale={locale}/>
            <Highlights id={id}/>
            <TextBlocks id={id} locale={locale}/>
            <Guides id={id} locale={locale}/>
            <MostPopularCity locale={locale} id={id} slug={slug}/>
            <ChangeOfLanguage languages={languages} title={title}/>
            <Breadcrumbs>
                <p id="breadcrumbs">
              <span>
                  <span>
                      <Link prefetch={false} className="first_link" href="/">{t('Free Tour')}</Link>
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
