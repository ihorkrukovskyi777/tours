import {getSystemReviews} from "@/entities/system-distribution/api";
import ListReviews from "@/shared/ui/list-reviews/list-reviews";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import ReviewCard from "@/widgets/latest-reviews/reviews-card";
import Reviews from "@/widgets/latest-reviews/item/reviews";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";
import '../../../widgets/latest-reviews/style.css';


export default async function SystemLatestReviews({id, locale,  showTitle= true , flexible}) {
    const i18n = await useDefaultI18n(locale)
    const limit = 9

    const reviews = await getSystemReviews(id, locale, limit, 0)

    if (!reviews?.data?.length) {
        return null
    }
    const { title } = getContentFlexibleTitle(flexible, locale)


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
                    type={'system'}
                >
                    {
                        reviews.data.map((item) => {
                            return (
                                <ReviewCard
                                    showTitle={showTitle}
                                    id={item.id}
                                    key={item.id}
                                    title={item.title}
                                    time={item.date}
                                    author={item.author}
                                    brandName={item.brandName}
                                    country={countryTranslates[item.country] ?? ''}
                                    rating={item.rating}
                                    message={item.message}
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
