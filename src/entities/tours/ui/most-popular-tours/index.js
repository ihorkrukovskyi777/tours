import Image from "next/image";
import Card from "@/shared/ui/card-components/card/card"
import Reviews from "@/widgets/latest-reviews/item/reviews";
import LanguageImages from "src/shared/ui/languages/language-images";
import ClockImage from '/public/images/svg/clock.svg'
import CalendarImage from '/public/images/svg/calendar.svg'
import {picketCityPosts} from "@/entities/api";
import './style.css';
import {ServiceDate} from "@/shared/service/service-date";

export default async function MostPopularTours({id, locale}) {

    const tours = await picketCityPosts(id, locale);
    return (
        <section className="most_popular_tour">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">Most Popular Tours</h2>
                    <div className="items">
                        {tours?.map((item) => {
                            const serviceDate = new ServiceDate(item.nextDeparture);

                            const showTime = serviceDate.differenceInDays > 7 ?
                                `${serviceDate.day}, ${serviceDate.dayNum} ${serviceDate.month}` :
                                `${serviceDate.day}, ${serviceDate.time}`
                            return (
                                <Card
                                    key={item.id}
                                    url={item}
                                    size={'390x250'}
                                    attachment={item.attachment}
                                    title={item.title}
                                    topElement={<LanguageImages locales={item.locales}/>}
                                    bottomElement={<Reviews rating={item.ratings?.rating || 0} count_reviews={item.ratings?.reviews || 0}/>}
                                >
                                    <div className="item_bottom">
                                        <div className="elem">
                                            <Image src={ClockImage} alt="clock" width={18} height={20} style={{fill: 'red'}} />
                                            <span className="second">Duration:</span>
                                            {item.durations?.length ? <span>{[...new Set(item.durations)].join('-')} Hours</span> : null }
                                        </div>
                                        <div className="elem">
                                            <Image src={CalendarImage} alt="clock" width={18} />
                                            <span className="second">
                                                Next Tour: {showTime}
                                            </span>
                                            <span>{item.lastDeparture}</span>
                                        </div>

                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
