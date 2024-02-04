import Image from "next/image";
import Card from "@/shared/ui/card-components/card/card"
import Reviews from "@/widgets/latest-reviews/item/reviews";
import LanguageImages from "@/shared/ui/languages/language-images";
import ClockImage from '/public/images/svg/clock.svg'
import CalendarImage from '/public/images/svg/calendar.svg'
import {ServiceDate} from "@/shared/service/service-date";
import {PATH_TOURS} from "@/shared/constants/route";
import {getHrefLocale} from "@/i18n/get-href-locale";
import './style.css';
import i18n from "@/i18n";
export default function RowTours({tours, title = '', i18n= {}}) {
    return (
        <section className="most_popular_tour">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{title}</h2>
                    <div className="items">
                        {tours?.map((item) => {
                            const serviceDate = new ServiceDate(item.departure?.nextDeparture);
                            const showTime = serviceDate.differenceInDays > 7 ?
                                `${serviceDate.day}, ${serviceDate.dayNum} ${serviceDate.month}` :
                                `${serviceDate.day}, ${serviceDate.time}`

                            return (
                                <Card
                                    key={item.id}
                                    url={`${getHrefLocale(item.locale)}${item.city?.slug}/${PATH_TOURS}/${item.slug}`}
                                    size={'390x250'}
                                    attachment={item.attachment}
                                    title={item.title}
                                    topElement={<LanguageImages locales={item?.departure.locales || []}/>}
                                    bottomElement={
                                        <Reviews
                                            rating={item.rating?.rating || 0}
                                            count_reviews={item.rating?.reviews || 0}
                                        />
                                    }
                                >
                                    {item.departure?.nextDeparture ?
                                        <div className="item_bottom">
                                            <div className="elem">
                                                <Image
                                                    src={ClockImage}
                                                    alt="clock"
                                                    width={18} height={20}
                                                    style={{fill: 'red'}}
                                                />
                                                <span className="second">{i18n.duration}:</span>
                                                {item.departure?.durations?.length ?
                                                    <span>{[...new Set(item.departure.durations)].join('-')} {i18n.hours}</span> : null}
                                            </div>

                                            <div className="elem">
                                                <Image src={CalendarImage} alt="clock" width={18}/>
                                                <span className="second">
                                                {i18n.next_tour}: {showTime}
                                            </span>
                                                <span>{item.lastDeparture}</span>
                                            </div>

                                        </div>
                                        : null}
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
