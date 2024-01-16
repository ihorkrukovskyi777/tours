import Image from 'next/image';
import StarEmpty from '@/assets/images/svg/star-empty.svg';
import StarHalf from '@/assets/images/svg/star-half.svg';
import StarFull from '@/assets/images/svg/star-full.svg';
import './style.css';

const STAR_WIDTH = 17;
export default function Reviews({rating, count_reviews, text_review = true, title}) {

    const stars = Array.from(new Array(5)).map((_, index) => index)

    return (
        <div className="reviews">
            <div className="rate_box">
                {count_reviews > 99 && text_review ?
                    <div className="count_rate">{count_reviews} Reviews</div>
                    :
                    null
                }
                <div>
                    {!!rating && stars.map(value => {
                        if((rating - value) >= 1)
                            return <Image key={value} src={StarFull} width={STAR_WIDTH} alt={'star full'} />;
                        else if((rating - value) > 0)
                            return <Image key={value} src={StarHalf} width={STAR_WIDTH} alt={'star half'} />;
                        else
                            return <Image key={value} src={StarEmpty} width={STAR_WIDTH} alt={'star empty'} />;
                    })}
                </div>
                {rating > 0 ?
                    <div className="rate_number">
                        {rating}
                    </div>
                    : null
                }
            </div>

        </div>

    );
}


