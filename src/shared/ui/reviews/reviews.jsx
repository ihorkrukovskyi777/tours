'use client';
import ReactStars from 'react-rating-stars-component';
import Image from 'next/image';
import StarEmpty from '@/assets/images/svg/star-empty.svg';
import StarHalf from '@/assets/images/svg/star-half.svg';
import StarFull from '@/assets/images/svg/star-full.svg';
import './style.css';

export default function Reviews({rating , count_reviews , text_review="true" , number_review='true'}) {
  const settings = {
    size: 20,
    count: 5,
    value: Number(rating),
    a11y: true,
    isHalf: true,
    edit: false,
    emptyIcon: <Image src={StarEmpty} alt='emptyIcon' />,
    halfIcon: <Image src={StarHalf} alt='halfIcon' />,
    filledIcon: <Image src={StarFull} alt='filledIcon' />,
  };


  return (
          <div className="reviews">
                <div className="rate_box">
                    {count_reviews > 99 && text_review ?
                        <div className="count_rate">{count_reviews} Reviews</div>
                        :
                        null
                    }
                    <ReactStars {...settings}/>
                    {number_review ?
                      <div className="rate_number">
                          {rating}
                      </div>
                      : null
                    }
                </div>

          </div>

  );
}


