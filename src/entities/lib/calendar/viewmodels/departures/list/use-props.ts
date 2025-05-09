import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {useLocalObservable} from "mobx-react-lite";
import {DepBooking} from "@entities/lib/calendar/@types";
import {useAnalytics} from "@entities/analytics/analytics.provider";

interface Loading {
    isMainLoading: boolean
}

interface Props {
    loading: Loading
    depModel: DeparturesModel
    onBooking (dep: DepBooking): void
}

export type PropsReturn = ReturnType<typeof useDeparturesListProps>

export function useDeparturesListProps({loading, depModel, onBooking}: Props) {
    const analytics = useAnalytics()
    const data =  useLocalObservable(() => ({
        get isLoading() {
            return loading.isMainLoading
        },
        get departures() {
            return depModel.departures
        },
        get nameDayWeek() {
            return depModel.option.page.nameDayWeek
        },
        get selectLocale() {
            return depModel.option.locale
        },

        get showMeMore() {
            return depModel.isNextPage && !this.isLoading
        },
        get showEmpty() {
            return !this.departures.length && !this.isLoading
        },
        onBooking: (dep: any) => {
            onBooking(dep);

            analytics?.addEventNoLastDuplicate({
                type: 'click_day_list'
            })

        },
        nextPage: depModel.nextPage
    }), {})

    return data;
}

