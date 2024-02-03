import {getReviews} from "@/entities/api";
import {createTranslation} from "@/i18n/server";
import ListReviews from "@/shared/ui/list-reviews/list-reviews";
import './style.css';


export default async function LatestReviews({id, locale, type='city'}) {
    const {t} = await createTranslation(locale)
    const limit = 9
    const reviews = await getReviews(id, locale, limit, 0, type)
    if (!reviews?.data?.length) {
        return null
    }
    return (
        <section className="latest_reviews">
            <div className="container">
                <h2 className="title">{t('Latest Reviews')}</h2>
                    <ListReviews id={id} reviews={reviews.data} total={reviews.total} limit={limit} type={type}/>
            </div>
        </section>
    )
}
