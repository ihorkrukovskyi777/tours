import Card from "@/shared/ui/card/card"
import Reviews from "@/shared/ui/reviews/reviews";
import './style.css';


export default function MostPopularCity({
                                            title = 'Most Popular Cities',
                                            items = ["London", 'Madrid', 'Lviv', "Bogota"]
                                        }) {
    return (
        <section className="most_popular_city">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{title}</h2>
                    <div className="items">
                        {items.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    url={item}
                                    title={item}
                                    bottomElement={<Reviews rating={2} count_reviews={1111}/>}
                                ></Card>
                            )
                        })}
                    </div>
                </div>
            </div>


        </section>

    )
}
