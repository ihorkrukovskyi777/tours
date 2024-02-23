import dynamic from "next/dynamic";
import I18nChangeOfLanguage from "@/shared/ui/languages/change-of-language/i18n-change-of-language";
import BannerHome from "@/shared/ui/flexible-content/banner-home/banner-home";
import Footer from "@/shared/ui/layouts/footer/footer";

const AllCities = dynamic(
  () => import("@/shared/ui/flexible-content/all-cities/all-cities"),
  { ssr: true }
);

const ContactUs = dynamic(
  () => import("@/shared/ui/flexible-content/contact-us/ssr-contact-us"),
  { ssr: true }
);
const MostPopular = dynamic(
  () => import("@/shared/ui/flexible-content/most-popular/most-popular"),
  { ssr: true }
);
const PopularTours = dynamic(
  () => import("@/shared/ui/flexible-content/popular-tours/popular-tours"),
  { ssr: true }
);
const FaqSections = dynamic(
  () => import("@/shared/ui/flexible-content/faq-section/faq-section"),
  { ssr: true }
);

const FLEXIBLE_CONTENT = {
  sitemap_section: AllCities,
  contact_us_section: ContactUs,
  banner: BannerHome,
  most_popular: MostPopular,
  popular_tours: PopularTours,
  faq_section: FaqSections,
};
export default async function FlexibleContent({
  flexibleContent = [],
  locale,
  title,
  id,
  languages,
  content = "",
}) {
  return (
    <>
      {!!content && typeof content === "string" ? (
        <div className="container">
          <div
            className="wpContent"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          ></div>
        </div>
      ) : null}
      {flexibleContent.map((flexible, index) => {
        const Component = FLEXIBLE_CONTENT[flexible];

        if (Component === undefined) {
          return null;
        }
        return (
          <Component
            key={flexible}
            locale={locale}
            title={title}
            id={id}
            index={index}
            flexibleKey={flexible}
          />
        );
      })}
      <I18nChangeOfLanguage languages={languages.map(item => ({...item, title: ''}))} title={'Free Tours'} />
      <Footer locale={locale} />
    </>
  );
}
