import {Fragment, memo} from "react";
import LanguageLoader from "@/shared/ui/loaders/language-loader";
import TourItem from "@/shared/ui/tour-item";
import {useAtomValue, useSetAtom} from "jotai";
import {
    atomDaysName,
    atomDepartures, atomDepsDetails, atomDepLocale, atomEmptyDepartures,
    atomEndPagination,
    atomLoading,
    atomNextPage, atomSetSelected
} from "@/entities/calendar/atom/departures";
import {useAtom} from "jotai/index";
import {atomModalBooking} from "@/entities/calendar/atom/modal";

export default memo(function DeparturesList() {
    const departures = useAtomValue(atomDepartures)
    const depLocale = useAtomValue(atomDepLocale)
    const daysName = useAtomValue(atomDaysName)
    const loading = useAtomValue(atomLoading)
    const endPagination = useAtomValue(atomEndPagination)
    const isEmpty = useAtomValue(atomEmptyDepartures)
    const depsDetails = useAtomValue(atomDepsDetails)

    const nextPage = useSetAtom(atomNextPage)
    const setSelected = useSetAtom(atomSetSelected)
    const setOpenModalBooking = useSetAtom(atomModalBooking);


    const onSelected =  id => {
        setSelected(id);
        setOpenModalBooking(id);
    }

    const showNewDay = {};
    return (
        <div className="days_wrap active">
            {loading ?
                <LanguageLoader/>
                :
                <>
                    {departures.map(departure => {
                        const date = departure.date;
                        const showDate = !showNewDay[date];
                        showNewDay[date] = true;
                        return (
                            <Fragment key={departure.depId}>
                                {showDate ? <div className="day_name">{daysName[date]}</div> : null}
                                <TourItem
                                    onClick={onSelected}
                                    id={departure.depId}
                                    title={depsDetails.tours[departure.tourId]}
                                    duration={departure.duration}
                                    time={departure.time}
                                    language={depLocale}
                                />
                            </Fragment>
                        )
                    })}
                </>
            }
            {isEmpty ? 'Empty' : null}
            {!endPagination && departures.length ? <button onClick={nextPage}>Show Me More</button> : null}
        </div>
    )
})
