import {
    useContextProcessBookingI18N,
    useContextProcessBookingStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {countryLocales} from "@/i18n/locales";
import {useCaseChangeLocale} from "@entities/lib/calendar/usecases";

export function useLanguagesProps() {
    const store = useContextProcessBookingStore()
    const i18n = useContextProcessBookingI18N()

    const state = useLocalObservable(() => ({
        seeAllBtn: false,
    }))

    return useLocalObservable(() => ({
        state: state,
        getters: {
            get selectedCode() {
                return store.option.locale
            },
            get availableLocale() {
                return store.option.availableLocale
            },
            get isLoading() {
                return store.loading.isMainLoading
            },
            get settingsTab() {
                return this.availableLocale?.length < 4 ? 'not_full' : '';
            },
            get mobileClass() {
                return this.availableLocale.length > 5 && !state.seeAllBtn ? 'hide_lasts_li' : ''
            },
            get countryLocales() {
                return countryLocales as { [key in string]: string }
            }
        },
        actions: {
            toggleSeeAll() {
                state.seeAllBtn = !state.seeAllBtn
            }
        },
        i18n
    }), {i18n: false});


}