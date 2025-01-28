import Reviews from '../item/reviews';
import {HelperDateHtml} from '@/shared/helpers/helperDateHtml';
import styles from './style.module.css';
import classNames from "classnames";


export default function ReviewCard({
                                       reply = null,
                                       country = '',
                                       brandName = '',
                                       time,
                                       author,
                                       rating,
                                       count_reviews,
                                       message = '',
                                       title,
                                       showTitle = true
                                   }) {

    const helperDateHtml = new HelperDateHtml(time);
    return (
        // itemScope itemProp="review" itemType="http://schema.org/Review"
        <div className={styles.review_item} >
            {/*<meta content={helperDateHtml.yyyyMmDd} itemProp="datePublished"></meta>*/}
            {/*<div itemProp="reviewRating"  itemScope itemType="http://schema.org/Rating">*/}
            {/*    <meta content={rating} itemProp="ratingValue"/>*/}
            {/*    <meta content="5" itemProp="bestRating"/>*/}
            {/*    <meta content="0" itemProp="worstRating"/>*/}
            {/*</div>*/}
            {/*<div itemProp="author" itemScope itemType="http://schema.org/Person">*/}
            {/*    <meta content={author?.trimEnd()} itemProp="name"/>*/}
            {/*</div>*/}
            <meta content={message} itemProp="reviewBody" />
            <div className={styles.top_part}>
                <div className={styles.stars}>
                    <Reviews
                        show_rating_number={false}
                        rating={rating}
                        count_reviews={count_reviews}
                        text_review={false}
                        number_review={false}
                        reply={reply}
                    />
                </div>
                <div className={styles.date}>{helperDateHtml.ddMmYy}</div>
            </div>
            <div className={styles.text}>
                {message}
            </div>
            <div className={styles.author}>{author?.trimEnd()}{country ? `, ${country}` : ''}</div>
            {reply ? <div className={styles.reply_item}>
                <div className={classNames(styles.reply, styles.text)}>{reply}</div>
                <div className={classNames(styles.subv_tour, styles.author)}>
                    {brandName}
                </div>
            </div> : null}
        </div>
    );
}

