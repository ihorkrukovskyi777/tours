import {observer} from "mobx-react-lite";
import ModalListToursView from "@entities/lib/calendar/additiona-sales/viewmodels/list-tours/view";

import CalendarView from "@entities/lib/calendar/viewmodels/calendar/view";

import {useCalendarAdditionalSalesProps} from "@entities/lib/calendar/viewmodels/calendar/use-props-additional-sales";
import HowManyView from "@entities/lib/calendar/viewmodels/how-many/view";
import {useHowManyAdditionalProps} from "@entities/lib/calendar/viewmodels/how-many/use-props-additional-sales";
import DeparturesDayItemsView from "@entities/lib/calendar/viewmodels/departures/day/view";
import {useDeparturesDayProps} from "@entities/lib/calendar/viewmodels/departures/day/use-props-additional";


const AdditionalSalesRootView = observer(() => {

    const viewModelCalendar = useCalendarAdditionalSalesProps()
    const viewModeHowMany = useHowManyAdditionalProps()
    const viewModelDay = useDeparturesDayProps()


    return (
        <>
            <ModalListToursView/>
            <CalendarView size='' viewModel={viewModelCalendar}>
                <HowManyView viewModel={viewModeHowMany}/>
            </CalendarView>
            <DeparturesDayItemsView viewModel={viewModelDay}/>
        </>
    )
})

export default AdditionalSalesRootView