import {getReviews} from "@/entities/api";
import ListReviews from "@/shared/ui/list-reviews/list-reviews";
import i18n from "@/i18n/server-locales";

import './style.css';


export default async function LatestReviews({id, locale, type='city', showTitle= true}) {
    await i18n.getFetchDefault();
    const limit = 9
    const reviews = await getReviews(id, locale, limit, 0, type)
    if (!reviews?.data?.length) {
        return null
    }
    return (
        <section className="latest_reviews">
            <div className="container">
                <h2 className="title">{i18n.t('Latest reviews')}</h2>
                    <ListReviews showTitle={showTitle} i18n={{show_me_more: i18n.t('Show me More')}} id={id} reviews={reviews.data} total={reviews.total} limit={limit} type={type}/>
            </div>
        </section>
    )
}
