'use client'
import {useState} from "react";
import {useParams} from "next/navigation";
import ReviewCard from "@/widgets/latest-reviews/reviews-card";
import Button from "@/shared/ui/selectors/button/button";
import {useTranslation} from "@/i18n/client";
import {getReviews} from "@/entities/api";
export default function ListReviews({reviews, total, limit, id, type}) {
    const {t} = useTranslation();
    const params = useParams();
    const [moreReviews, setMoreReviews] = useState({
        offset: limit,
        value: [],
    })
    const loadReviews = async () => {
        const results = await getReviews(id, params.locale, limit, moreReviews.offset, type)
        setMoreReviews({
            value: [...moreReviews.value, ...results.data],
            offset: moreReviews.offset + limit,
        })
    }
    return (
        <>
            <div className="wrapper">
                {
                    [...reviews, ...moreReviews.value].map((item) => {
                        return (
                            <ReviewCard
                                reviewsTitle={t('Reviews')}
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                time={item.date}
                                author={item.author}
                                rating={item.rating}
                            >
                                {item.message}
                            </ReviewCard>
                        )
                    })
                }
            </div>
            {total > [...reviews, ...moreReviews.value].length ? <Button onClick={loadReviews} prevent={true}>{t('Show me More')}</Button> : null}
        </>
    )
}
