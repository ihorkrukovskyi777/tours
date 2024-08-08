import {fallbackLng} from "@/i18n/settings";
import Card from "@/shared/ui/card-components/card/card";
import Reviews from "@/widgets/latest-reviews/item/reviews";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import LanguageImages from "@/shared/ui/languages/language-images";
import './style.css'


export default async function RowCities({ locale, cities = [], title , sizeSection}) {
    const i18n = await useDefaultI18n(locale);

    if(!cities?.length) {
        return null;
    }
    return (
        <section className={`most_popular_city ${sizeSection}`}>
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{title}</h2>
                    <div className="items">
                        {cities.map((city, index) => {
                            const localeSlug = city?.locale === fallbackLng ? '' : `/${city.locale}`
                            return (
                                <Card
                                    locales={city?.departure?.locales || []}
                                    font={'large'}
                                    key={index}
                                    size={"390x250"}
                                    attachment={city.attachment}
                                    url={`${localeSlug}/${city.slug}`}
                                    title={city.title}
                                    topElement={<LanguageImages locales={city?.departure?.locales || []}/>}
                                    bottomElement={<Reviews size={12} title={i18n.t('Reviews')} rating={city.rating} count_reviews={city.reviews}/>}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </section>
    )
}
