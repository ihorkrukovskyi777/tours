import Banner from "@/shared/ui/banner";
import Reviews from "@/widgets/latest-reviews/item/reviews";
import LanguageImages from "@/shared/ui/languages/language-images";
import ClockSvg from "@/assets/images/svg/clock-svg";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import { getBannerData } from "@/entities/api";
import "./style.css";

export default async function BannerTour({ id, locale, isMobile }) {
  const i18n = await useDefaultI18n(locale);
  const tour = await getBannerData(id, locale, "tour");
  let labelHour = tour.departure.durations?.find((val) => val > 1)
    ? "Hours"
    : "Hour";

  const TimeComponent = (
    <>
      <ClockSvg />
      <div>
        <span>
          {tour?.departure?.durations
            ?.map((duration) =>
              Number.isInteger(duration)
                ? duration.toString()
                : parseFloat(duration?.toFixed(2))
            )
            .join("-")}{" "}
          {i18n.t(labelHour)}
        </span>
      </div>
    </>
  );
  const BottomComponent = (
    <div className="tour_banner_bottom_mobile">
      <Reviews
        rating={tour?.rating?.rating ?? 0}
        count_reviews={tour?.rating?.reviews ?? 0}
        title={i18n.t("Reviews")}
      />
      <div className="time_wrapper">
        {tour?.departure?.durations?.length ? TimeComponent : null}
      </div>
    </div>
  );
  return (
    <Banner
      headMobile={<LanguageImages locales={tour.departure.locales} />}
      isMobile={isMobile}
      title={tour.title}
      attachment={tour.attachment}
      size="tour_banner"
      bottomView={BottomComponent}
    >
      <LanguageImages locales={tour.departure.locales} />
      <div className="time_wrapper">
        {tour?.departure?.durations?.length ? TimeComponent : null}
      </div>
    </Banner>
  );
}
