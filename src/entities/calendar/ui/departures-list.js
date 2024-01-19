import {Fragment, useContext, useMemo} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import LogoOneport from '../../../../public/images/svg/logo-oneport.svg';
import LanguageLoader from "@/shared/ui/loaders/language-loader";
import TourItem from "src/entities/calendar/ui/tour-item";
import {StoreCalendarContext} from "@/entities/calendar/calendar-provider";
import { ServiceDate } from "@/shared/service/service-date";
import { setFormatDDMMYYYYtoMMDDYYYY } from "@/shared/hepers/date";
import {useTranslation} from "@/i18n/client";

export default observer(function DeparturesList() {
    const { t} = useTranslation();
    const {
        storeCalendar: {
            loading, departures, selectedBooking,
            storeDepLogic: { isNextPage, nextPage, locale }
        }
    } = useContext(StoreCalendarContext);

    const showNewDay = {};

    const showMeMore = useMemo(() => isNextPage && !loading.isLoad, [isNextPage, loading.isLoad])
    const showEmpty = useMemo(() => !departures.length && !loading.isLoad, [departures.length, loading.isLoad])

    return (
        <div className="days_wrap">
            <div className="logo-calendar">
                <Image src={LogoOneport} alt="logo-oneport"></Image>
            </div>
            {loading.isLoad ?
                <LanguageLoader/>
                :
                <>
                    {departures.map((departure, index) => {
                        const date = departure.date;
                        const showDate = !showNewDay[date];
                        const service = new ServiceDate(setFormatDDMMYYYYtoMMDDYYYY(date))
                        showNewDay[date] = true;

                        return (
                            <Fragment key={index}>
                                {showDate ? <div className="day_name">{t(service.day)}, {service.dayNum} {t(service.month)}</div> : null}
                                <TourItem
                                    locale={locale}
                                    dep={departure}
                                    onClick={selectedBooking}
                                />
                            </Fragment>
                        )
                    })}
                </>
            }
            {showEmpty ? <div className="error-block block">Departures not found</div> : null}
            {showMeMore ? <button className="show-more" onClick={nextPage}>Show Me More</button> : null}
        </div>
    )
})
