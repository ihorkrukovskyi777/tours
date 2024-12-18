import {observer} from "mobx-react-lite";
import Image from "next/image";
import LogoOneport from '/public/images/svg/logo-oneport.svg';
import {ServiceDate} from "@shared/service/service-date";
import {setFormatDDMMYYYYtoMMDDYYYY} from "@shared/helpers/date";
import {Fragment} from "react";
import LanguageLoader from "@/shared/ui/loaders/language-loader";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import {PropsReturn} from "@entities/lib/calendar/viewmodels/departures/list/use-props";
import TourItem from "@/entities/calendar/ui/tour-item";

interface Props {
    viewModel: PropsReturn
}

const DeparturesListView = observer(({ viewModel }: Props) => {
    const i18n = useContextProcessBookingI18N()

    const showNewDay: { [key in string]: boolean } = {};

    return (
        <div className="days_wrap">
            <div className="logo-calendar">
                <Image src={LogoOneport} alt="logo-oneport"></Image>
            </div>
            {viewModel.isLoading ?
                <LanguageLoader/>
                :
                <>
                    {viewModel.departures.map((departure, index) => {
                        const date = departure.date;
                        const showDate = !showNewDay[date];
                        const service = new ServiceDate(setFormatDDMMYYYYtoMMDDYYYY(date), viewModel.nameDayWeek)
                        showNewDay[date] = true;

                        return (
                            <Fragment key={index}>
                                {showDate &&
                                    <div
                                        className="day_name">
                                        {/*// @ts-ignore*/}
                                        {i18n.days[service.day]}, {service.dayNum} {i18n.months[service.month]}
                                    </div>
                                }
                                <TourItem
                                    isShowBooking={false}
                                    isActive={false}
                                    i18n={i18n}
                                    locale={viewModel.selectLocale}
                                    dep={departure}
                                    onClick={viewModel.onBooking}
                                />
                            </Fragment>
                        )
                    })}
                </>
            }
            {viewModel.showEmpty &&
                <div className="error-block block">
                    {i18n.departures_not_found}
                </div>
            }
            {viewModel.showMeMore &&
                <button
                    className="show-more"
                    onClick={viewModel.nextPage}>
                    {i18n.show_me_more}
                </button>
            }
        </div>
    )

})

export default DeparturesListView