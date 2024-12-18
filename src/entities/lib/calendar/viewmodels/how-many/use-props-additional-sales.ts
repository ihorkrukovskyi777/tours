import {
    useContextProcessBookingStore as useContextStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";

export function useHowManyAdditionalProps() {
    const {additionalSales} = useContextStore();

    return useLocalObservable(() => ({
        get depModelList() {
            return additionalSales.selectTourCalendar.departuresModel?.departures
        },
        get depModel() {
            return additionalSales.selectTourCalendar.departuresModel?.departuresCalendar
        },
        get peopleNumber() {
            return this.depModel?.option.peopleNumber ?? 0
        },
        get isEmpty() {
            return this.depModel?.isEmpty ?? false
        },
        onChangePeople(val: number) {
            this.depModel?.option.setPeople(val)
            this.depModelList?.option.setPeople(val)
            this.depModel?.changePeople()
            this.depModelList?.changePeople()
        },
    }), {})

}