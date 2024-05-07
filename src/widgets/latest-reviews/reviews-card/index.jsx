import Reviews from '../item/reviews';
import {HelperDateHtml} from '@/shared/helpers/helperDateHtml';
import styles from './style.module.css';
import classNames from "classnames";


export default function ReviewCard({children, reply = null, brandName ='', time, author, rating, count_reviews, title, showTitle = true}) {

    const helperDateHtml = new HelperDateHtml(time);
    return (
        <div className={styles.review_item}>
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
                {children}
            </div>
            <div className={styles.author}>{author}</div>
            {reply ? <div className={styles.reply_item}>
                <div className={classNames(styles.reply,styles.text)}>{reply}</div>
                <div className={classNames(styles.subv_tour,styles.author)}>
                    {brandName}
                </div>
            </div> : null }
        </div>
    );
}

