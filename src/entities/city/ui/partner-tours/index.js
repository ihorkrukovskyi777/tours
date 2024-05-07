import ViewQuote from "@/widgets/text-quote/view-quote";
import PartnerRowTours from "@/shared/ui/card-components/partner-row-tours/partner-row-tours";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

import { picketPartnerTours } from "@/entities/api";
import { log } from "util";

export default async function PartnerTours({ id, locale, size = "small" }) {
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
          {data?.title && (
            <ViewQuote title={data.title} description={data.description} />
          )}
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
