import ReviewCard from "@/shared/ui/reviews-card";
import './style.css';

export default function LatestReviews({title="Latest Reviews"}) {

  const data = [1,23,12312,321,3123,1221,'Free Gaitan Tour Bogota'];

  return (
    <section className="latest_reviews">
        <div className="container">
            <h2 className="title">{title}</h2>
            <div className="wrapper">
                {data.map((item , index) => {
                    return (
                      <ReviewCard key={index} title={item} time='01/11/23'  author="Ryan" rating="2"  count_reviews="1" >
                        It was a great tour. We could understand everything very well and got good and interesting information. We learned a lot and have beautiful photos as memories of the great street art in Bogotá. Great thanks to our guide from Venezuela!
                      </ReviewCard>
                    )
                })}
            </div>
        </div>
    </section>
  )
}
