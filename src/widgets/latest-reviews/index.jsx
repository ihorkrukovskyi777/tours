import {getReviews} from "@/entities/api";
import ListReviews from "@/shared/ui/list-reviews/list-reviews";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

import './style.css';
import ReviewCard from "@/widgets/latest-reviews/reviews-card";


export default async function LatestReviews({id, locale, type='city', showTitle= true}) {
    const i18n = await useDefaultI18n(locale)
    const limit = 3
    const reviews = await getReviews(id, locale, limit, 0, type)
    if (!reviews?.data?.length) {
        return null
    }
    return (
        <section className="latest_reviews">
            <div className="container">
                <h2 className="title">{i18n.t('Latest reviews')}</h2>
                    <ListReviews
                        showTitle={showTitle}
                        i18n={{show_me_more: i18n.t('Show me More')}}
                        id={id}
                        reviewsInit={reviews.data?.length}
                        total={reviews.total}
                        limit={limit}
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
                                        time={item.date}
                                        author={item.author}
                                        brandName={item.brandName}
                                        rating={item.rating}
                                        reply={item.reply}
                                    >
                                        {item.message}
                                    </ReviewCard>
                                )
                            })
                        }
                    </ListReviews>
            </div>
        </section>
    )
}
