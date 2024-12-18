import {
    useContextProcessBookingI18N,
    useContextProcessBookingStore as useContextStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {useEffect} from "react";
import {useCaseFetchPhones, useFetchDepartures} from "@entities/lib/calendar/usecases";

export function useProcessBookingProps() {
    const store = useContextStore();
    const i18n = useContextProcessBookingI18N()

    const useCaseDep = useFetchDepartures();
    const useCasePhones = useCaseFetchPhones();

    const data = useLocalObservable(() => ({
        getters: {
            get title() {
                return store.option.page.title
            },
            get depModel() {
                return store.depModel
            },
            get loadingModel() {
                return store.loading
            },
            get modals() {
                return store.modals
            }
        },
        i18n,
    }), {i18n: false})

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCaseDep().then()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCasePhones().then()
    }, [])
    return data;
}