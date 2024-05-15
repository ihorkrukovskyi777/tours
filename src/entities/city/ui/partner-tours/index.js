import ViewQuote from "@/widgets/text-quote/view-quote";
import PartnerRowTours from "@/shared/ui/card-components/partner-row-tours/partner-row-tours";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

import { picketPartnerTours } from "@/entities/api";

import Highlights from "@/widgets/highlights";
import LatestReviews from "@/widgets/latest-reviews";

export default async function PartnerTours({ id, locale, size = "small" , title = '' }) {
  let data = await picketPartnerTours(id, locale);
  const i18n = await useDefaultI18n(locale);

  if (!Array.isArray(data.partnerTours) || data.partnerTours.length === 0) {
    return null;
  }

  const tours = data.partnerTours.map((item) => ({
    ...item,
  }));

  return (
    <>
      {tours?.length && (
        <>
          {data?.description && (
            <ViewQuote description={data.description} no_margin={true} />
          )}
          <Highlights id={id} locale={locale} hiddenTitle={true} />
          <LatestReviews id={id} locale={locale} city={title} />
          <PartnerRowTours
            tours={tours}
            i18n={{
              duration: i18n.t("Duration"),
              hours: i18n.t("Hours"),
              hour: i18n.t("Hour"),
              days: i18n.getDays(),
              reviews: i18n.t("Reviews"),
              months: i18n.getMonths(),
              ticket: i18n.t("Tickets"),
              title: i18n.t("Paid Tours and Activities"),
            }}
          />
        </>
      )}
    </>
  );
}
