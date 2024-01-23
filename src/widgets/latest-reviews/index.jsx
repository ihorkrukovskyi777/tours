import {getReviews} from "@/entities/api";
import {createTranslation} from "@/i18n/server";
const ListReviews = dynamic(
    () => import("@/shared/ui/list-reviews/list-reviews"),
    { ssr: false }
)

import './style.css';
import dynamic from "next/dynamic";


export default async function LatestReviews({id, locale, type='city'}) {

    const {t} = await createTranslation()
    const limit = 9
    const reviews = await getReviews(id, locale, limit)
    if (!reviews?.data?.length) {
        return null
    }
    return (
        <section className="latest_reviews">
            <div className="container">
                <h2 className="title">{t('Latest Reviews')}</h2>
                    <ListReviews id={id} reviews={reviews.data} total={reviews.total} limit={limit}/>
            </div>
        </section>
    )
}
