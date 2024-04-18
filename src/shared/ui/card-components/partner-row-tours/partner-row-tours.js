import Image from "next/image";
import ClockImage from "/public/images/svg/clock.svg";
import TicketImage from "/public/images/svg/ticket.svg";
import Card from "@/shared/ui/card-components/card/card";
import Reviews from "@/widgets/latest-reviews/item/reviews";
import { getHrefLocale } from "@/i18n/get-href-locale";
import { PATH_TOURS } from "@/shared/constants/route";
import LanguageImages from "@/shared/ui/languages/language-images";
import "./style.css";

export default function PartnerRowTours({ tours, i18n = {} }) {
  return (
    <section className="partners_tour">
      <div className="container">
        <div className="wrapper">
          <h2 className="title">{i18n.title}</h2>
          <div className="items">
            {tours?.map((item) => {
              const labelHour = item.departure?.durations.find((val) => val > 1)
                ? "hours"
                : "hour";
              return (
                <Card
                  key={item.id}
                  url={`${getHrefLocale(item.locale)}${
                    item.city?.slug
                  }/${PATH_TOURS}/${item.slug}`}
                  size={"390x250"}
                  attachment={item.attachment}
                  title={item.title}
                  topElement={
                    <LanguageImages locales={item?.departure?.locales || []} />
                  }
                  bottomElement={
                    <Reviews
                      sizeLabelReviews={"medium"}
                      size={12}
                      rating={item.rating?.rating || 0}
                      count_reviews={item.rating?.reviews || 0}
                      title={i18n.reviews}
                    />
                  }
                >
                  <div className="item_bottom">
                    <div className=" elem">
                      <Image
                        src={ClockImage}
                        alt=" clock"
                        width={18}
                        height={20}
                        style={{ fill: "red" }}
                      />
                      <span className=" second">{i18n.duration}:</span>
                      {item.departure?.durations?.length && (
                        <span>
                          {item?.departure?.durations
                              ?.map((duration) =>
                                  Number.isInteger(duration)
                                      ? duration.toString()
                                      : parseFloat(duration?.toFixed(2))
                              )
                              .join("-")}{" "}
                          {i18n[labelHour]}
                        </span>
                      )}
                    </div>
                    {item.price && (
                      <div className="elem">
                        <Image
                          src={TicketImage}
                          alt=" clock"
                          width={18}
                          height={20}
                          style={{ fill: "red" }}
                        />
                        <span className=" second">{i18n.ticket}:</span>
                        <span>{item.price}</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
