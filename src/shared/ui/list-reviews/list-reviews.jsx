'use client'
import {useState} from "react";
import {useParams} from "next/navigation";
import ReviewCard from "@/widgets/latest-reviews/reviews-card";
import Button from "@/shared/ui/selectors/button/button";
import {getReviews} from "@/entities/api";
export default function ListReviews({i18n, total, reviewsInit = 0, offset,  limit, id, type, showTitle = true, children}) {
    const params = useParams();
    const [moreReviews, setMoreReviews] = useState({
        offset: offset,
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
                {children}
                {
                    moreReviews.value.map((item) => {
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
                                message={item.message}
                                country={i18n[item.country] ?? ''}
                            >
                            </ReviewCard>
                        )
                    })
                }
            </div>
            {total > reviewsInit + moreReviews.value.length ? <Button onClick={loadReviews} prevent={true}>{i18n.show_me_more}</Button> : null}
        </>
    )
}
