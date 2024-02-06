import Reviews from '../item/reviews';
import {HelperDateHtml} from '@/shared/helpers/helperDateHtml';
import styles from './style.module.css';


export default function ReviewCard({children, isShow, time, author, rating, count_reviews, title, reviewsTitle}) {

    const helperDateHtml = new HelperDateHtml(time);

    return (
        <div className={styles.review_item}>
            <div className={styles.review_title}>{title}</div>
            <div className={styles.top_part}>
                <div className={styles.stars}>
                    <Reviews
                        isShow={isShow}
                        reviewsTitle={reviewsTitle}
                        show_rating_number={false}
                        rating={rating}
                        count_reviews={count_reviews}
                        text_review={false}
                        number_review={false}
                    />
                </div>
                <div className={styles.date}>{helperDateHtml.ddmmyear}</div>
            </div>
            <div className={styles.text}>
                {children}
            </div>
            <div className={styles.author}>{author}</div>
        </div>
    );
}

