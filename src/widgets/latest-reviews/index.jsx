import {getReviews} from "@/entities/api";
import ListReviews from "@/shared/ui/list-reviews/list-reviews";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import ReviewCard from "@/widgets/latest-reviews/reviews-card";
import Reviews from "@/widgets/latest-reviews/item/reviews";

import './style.css';


export default async function LatestReviews({id, locale, type='city', showTitle= true , city = ''}) {
    const i18n = await useDefaultI18n(locale)
    const limit = 3

    const reviews = await getReviews(id, locale, limit, 0, type)
    if (!reviews?.data?.length) {
        return null
    }

    const title =  !city ? i18n.t('Latest reviews') : i18n.t('Reviews of Free Tours in') + ' ' + city;


    const countryTranslates = i18n.getCountries();
    return (
        <section className="latest_reviews">
            <div className="container">
                <div className="latest_reviews__title">
                    <h2 className="title">{title}</h2>
                    <div className="latest_reviews__title__reviews">
                        <Reviews rating={reviews?.rating?.rating} count_reviews={reviews?.rating?.reviews} title={i18n.t('Reviews')}/>
                    </div>
                </div>
                <ListReviews
                        showTitle={showTitle}
                        i18n={{show_me_more: i18n.t('Show me More'), ...countryTranslates}}
                        id={id}
                        reviewsInit={reviews.data?.length}
                        total={reviews.total}
                        limit={9}
                        offset={limit}
                        type={type}
                    >
                        {
                            reviews.data.map((item) => {
                                return (
                                    <ReviewCard
                                        showTitle={showTitle}
                                        id={item.id}
                                        key={item.id}
                                        title={item.title}
                                        metaBody={item.message}
                                        time={item.date}
                                        author={item.author}
                                        message={item.brandName}
                                        country={countryTranslates[item.country] ?? ''}
                                        rating={item.rating}
                                        reply={item.reply}
                                    >
                                    </ReviewCard>
                                )
                            })
                        }
                    </ListReviews>
            </div>
        </section>
    )
}
