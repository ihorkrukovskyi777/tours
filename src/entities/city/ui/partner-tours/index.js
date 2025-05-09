import PartnerRowTours from "@/shared/ui/card-components/partner-row-tours/partner-row-tours";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import { picketPartnerTours } from "@/entities/api";
import Highlights from "@/widgets/highlights";
import LatestReviews from "@/widgets/latest-reviews";
import TextSection from "@/entities/city/ui/text-section";
import InsertCode from "@/widgets/insert-code/insert-code";
import WidgetOtherTours from "@/widgets/widget-other-tours";

export default async function PartnerTours({ id, locale, size = "small" , title = '' , texts = '', textSectionData , titleTextSection = ''} ) {
  let data = await picketPartnerTours(id, locale);
  const i18n = await useDefaultI18n(locale);

  if (!Array.isArray(data.partnerTours) || data.partnerTours.length === 0) {
    return <>

       {/*SHOW WHEN NO MAP*/}
      <Highlights id={id} locale={locale} hiddenTitle={true}  />
      <LatestReviews id={id} locale={locale} city={title} />
      <WidgetOtherTours id={id} type="city" locale={locale}/>
      <TextSection titleSection={titleTextSection} showTitle={true} data={textSectionData[2] ?? ''}/>
    </>;
  }

  const tours = data.partnerTours.map((item) => ({
    ...item,
  }));
  

  return (
    <>
      {tours?.length && (
        <>
          <Highlights id={id} locale={locale} hiddenTitle={true} />
          <LatestReviews id={id} locale={locale} city={title} />
          <WidgetOtherTours id={id} type="city" locale={locale} />
          <TextSection titleSection={titleTextSection} showTitle={true} data={textSectionData[2] ?? ''}/>
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
