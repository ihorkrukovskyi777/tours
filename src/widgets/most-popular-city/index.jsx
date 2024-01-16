import Card from "@/shared/ui/card/card"
import Reviews from "@/shared/ui/reviews/reviews";
import {getPickCities} from "@/entities/api";
import { createTranslation} from "@/i18n/server";
import {fallbackLng} from "@/i18n/settings";

import './style.css';


export default async function MostPopularCity({id, locale = 'en'}) {
    const results = await getPickCities(id, locale)

    if (!Array.isArray(results?.cities)) {
        return null;
    }

    return (
        <section className="most_popular_city">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{results.title}</h2>
                    <div className="items">
                        {results?.cities?.map((city, index) => {
                            const localeSlug = city.locale === fallbackLng ? '' : `/${city.locale}`
                            return (
                                <Card
                                    key={index}
                                    size={"390x250"}
                                    attachment={city.attachment}
                                    url={`${localeSlug}/${city.slug}`}
                                    title={city.title}
                                    bottomElement={<Reviews rating={city.rating} count_reviews={city.reviews}/>}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>


        </section>

    )
}
