import {observer} from "mobx-react-lite";
import {TourAdditionalModel} from "@entities/lib/calendar/additiona-sales/models/tour-additional.model";
import {ServiceDate} from "@shared/service/service-date";
import {setFormatDDMMYYYYtoMMDDYYYY} from "@shared/helpers/date";
import {Fragment, useState} from "react";
import TourItem from "@/entities/calendar/ui/tour-item";
import Link from "next/link";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import ArrowNormalSvg from "@/assets/images/svg/arrow-normal.svg";
import Image from "next/image";
import {useCaseFetchBookingAdditional} from "@entities/lib/calendar/usecases";
import '@entities/lib/calendar/ui/styles/additional-card.css'

interface Props {
    tour: TourAdditionalModel
    nameDayWeek: boolean
    isLoading: boolean
    onOpenCalendar(id: number): void
}

const AdditionalSaleCard = observer(({tour, nameDayWeek, onOpenCalendar, isLoading}: Props) => {
    const src = tour.data.attachment?.src;
    const alt = tour.data.attachment?.alt ?? 'trip';

    const [seeMore, setSeeMore] = useState(false)
    const [selectedDeep, setSelectedDeep] = useState<string | null>(null)

    const toggleSee = () => setSeeMore(v => !v);

    const departures = tour.departures.departures;
    const showNewDay: { [key in string]: boolean } = {};

    const i18n = useContextProcessBookingI18N()

    const onBooking = useCaseFetchBookingAdditional();

    const toggleSelect = (key: string) => {
        setSelectedDeep(key)
    }

    return (
        <div className="additional_card" style={{pointerEvents: isLoading ? 'none' : 'auto'}}>
            <div className="additional_card__image">
                {src &&
                    <img
                        loading="lazy"
                        src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${src}/390x250`}
                        alt={alt}
                    />
                }
                <div className="intro">
                    <Link href={tour.slug}>{tour.title}</Link>
                </div>
                <div className="additional_card__image__show_more" onClick={toggleSee}>
                    {i18n.see_more}
                    <div className={seeMore ? 'active' : ''}>
                        <Image src={ArrowNormalSvg} alt=""/>
                    </div>
                </div>
            </div>
            {seeMore && <>
                <div className="additional_card__image__content">
                    <h2>{tour.data.content.title || tour.title}</h2>
                    <div className="intro">
                        <ul>
                            {tour.data.content.text?.map((text, index) => {
                                return <li key={index} dangerouslySetInnerHTML={{__html: text ?? ''}}></li>
                            })}
                        </ul>

                    </div>
                </div>
                <div className="days_wrap additional_card__image__days_wrap">

                    {departures.map((departure, index) => {

                        const key = `${departure.fullTime ?? ''}${departure.depId}`
                        const date = departure.date
                        const showDate = !showNewDay[date]
                        const service = new ServiceDate(setFormatDDMMYYYYtoMMDDYYYY(date), nameDayWeek)
                        showNewDay[date] = true;

                        return (
                            <Fragment key={key}>
                                {showDate &&
                                    <div
                                        className="day_name">
                                        {/*// @ts-ignore*/}
                                        {i18n.days[service.day]}, {service.dayNum} {i18n.months[service.month]}
                                        {index === 0 &&
                                            <button
                                                className="additional_card__image__change_date button"
                                                onClick={() => onOpenCalendar(tour.data.id)}>
                                                {i18n.change_date}
                                            </button>
                                        }
                                    </div>
                                }
                                <TourItem
                                    isShowBooking={selectedDeep === key}
                                    i18n={i18n}
                                    // @ts-ignore
                                    onBooking={() => onBooking(departure)}
                                    locale={tour.locale}
                                    dep={departure}
                                    isActive={selectedDeep === key}
                                    hideLocale={true}
                                    isLoading={isLoading}
                                    onClick={() => toggleSelect(key)}
                                >
                                </TourItem>
                            </Fragment>
                        )
                    })}
                    {departures.length === 0 &&
                        <div>
                            <button
                                style={{marginLeft: 'auto', display: 'block'}}
                                className="additional_card__image__change_date button"
                                onClick={() => onOpenCalendar(tour.data.id)}>
                                {i18n.change_date}
                            </button>
                            <div className="error-block block">
                                {i18n.departures_not_found}
                            </div>
                        </div>
                    }
                </div>
            </>}
        </div>
    )
})

export default AdditionalSaleCard