import Reviews from '../reviews/reviews';

import styles from './style.module.css';


export default function ReviewCard({children , time , author , rating , count_reviews , title, id }) {
  return (
    <div className={styles.review_item}>
        <div className={styles.review_title}>{title}</div>
        <div className={styles.top_part}>
            <div className={styles.stars}>
                <Reviews key={id} rating={rating} count_reviews={count_reviews} text_review={false} number_review={false} />
            </div>
            <div className={styles.date}>{time}</div>
        </div>
        <div className={styles.text}>
            {children}
        </div>
        <div className={styles.author}>{author}</div>
    </div>
  );
}

