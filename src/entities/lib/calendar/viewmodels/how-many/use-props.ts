import {
    useContextProcessBookingStore as useContextStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {useCaseChangePeople} from "@entities/lib/calendar/usecases";
import {ViewModel} from "@entities/lib/calendar/viewmodels/how-many/view";

export function useHowManyProps(): ViewModel {
    const store = useContextStore();
    const onChangePeople = useCaseChangePeople()

    return useLocalObservable(() => ({
        get peopleNumber() {
            return store.option.peopleNumber
        },
        get isEmpty() {
            return store.depModel.isEmpty
        },
        onChangePeople
    }), {})

}