import {fallbackLng} from "@/i18n/settings";
import Card from "@/shared/ui/card-components/card/card";
import Reviews from "@/widgets/latest-reviews/item/reviews";
import i18n from "@/i18n";
import './style.css'
export default async function RowCities({ cities = [], title}) {
    await i18n.getFetchDefault();

    if(!cities?.length) {
        return null;
    }
    return (
        <section className="most_popular_city">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{title}</h2>
                    <div className="items">
                        {cities.map((city, index) => {
                            const localeSlug = city?.locale === fallbackLng ? '' : `/${city.locale}`
                            return (
                                <Card
                                    key={index}
                                    size={"390x250"}
                                    attachment={city.attachment}
                                    url={`${localeSlug}/${city.slug}`}
                                    title={city.title}
                                    bottomElement={<Reviews title={i18n.t('Reviews')} rating={city.rating} count_reviews={city.reviews}/>}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </section>
    )
}
