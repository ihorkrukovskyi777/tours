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

export default function RowTours({tours, title = '', title_first = '' ,  i18n = {}, sizeSection = 'small'}) {
    return (
        <section className={`most_popular_tour ${sizeSection}`}>
            <div className=" container">
                <div className=" wrapper">
                    <h2 className=" title">{title_first} {title}</h2>
                    <div className=" items">
                        {tours?.map((item) => {
                            const labelHour = item.departure?.durations.find(val => val > 1) ? 'hours' : 'hour';
                            const serviceDate = new ServiceDate(item.departure?.nextDeparture);

                            const isSelfGuide = serviceDate.time === '23:59'
                            const showTime = serviceDate.differenceInDays > 7 ?
                                `${i18n.days[serviceDate.day]}, ${serviceDate.dayNum} ${i18n.months[serviceDate.month]}` :
                                `${i18n.days[serviceDate.day]}, ${serviceDate.time}`

                            return (
                                <Card
                                    key={item.id}
                                    url={`${getHrefLocale(item.locale)}${item.city?.slug}/${PATH_TOURS}/${item.slug}`}
                                    size={'390x250'}
                                    attachment={item.attachment}
                                    title={item.title}
                                    topElement={<LanguageImages locales={item?.departure?.locales || []}/>}
                                    bottomElement={
                                        <Reviews
                                            sizeLabelReviews={'medium'}
                                            size={12}
                                            rating={item.rating?.rating || 0}
                                            count_reviews={item.rating?.reviews || 0}
                                            title={i18n.reviews}
                                        />
                                    }
                                >
                                    {item.departure?.locales?.length ?
                                        <div className=" item_bottom">
                                            <div className=" elem">
                                                <Image
                                                    src={ClockImage}
                                                    alt=" clock"
                                                    width={18} height={20}
                                                    style={{fill: 'red'}}
                                                />
                                                <span className=" second">{i18n.duration}:</span>
                                                {item.departure?.durations?.length ?
                                                    <span>{[...new Set(item.departure.durations)].join('-')} {i18n[labelHour]}</span> : null}
                                            </div>
                                            {item.departure?.nextDeparture ?
                                                <div className=" elem">
                                                    <Image src={CalendarImage} alt=" clock" width={18}/>
                                                    <span className=" second">
                                                        {i18n.next_tour}: {isSelfGuide ? i18n.flexible : showTime}
                                                    </span>
                                                    <span>{item.lastDeparture}</span>
                                                </div> :
                                                null}

                                        </div>
                                        : <div className=" item_bottom"><p>{i18n.not_departure}</p></div>}
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
