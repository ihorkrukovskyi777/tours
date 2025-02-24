import {useLocalObservable} from "mobx-react-lite";
import {useContextProcessBookingStore} from "@entities/lib/calendar/process-booking.provider";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {fallbackLng} from "@/i18n/settings";

export function useAdditionalSalesProps() {
    const store = useContextProcessBookingStore()
    return useLocalObservable(() => ({
        get isOpen() {
          return store.modals.modals[MODAL.ADDITIONAL_SALES].visibly
        },
        get tourList() {
            return store.additionalSales.tours
        },
        get peopleNumber() {
            return store.additionalSales.option.peopleNumber
        },
        get isAbove() {
            return store.modals.modals[MODAL.ADDITIONAL_SALES].visibly && Object.values(store.modals.modals).filter(v => v.visibly).length === 1
        },
        get halfOpacity() {
            return false
        },
        get nameDayWeek() {
           return store.additionalSales.option.page.nameDayWeek
        },
        get linkCity() {
            const tour =  store.additionalSales.tours[0]
            if(tour) {
                const localeSlug = tour.locale === fallbackLng ? '' : `/${tour.locale}`
                return `${localeSlug}/${tour.citySlug}`
            }

            return '/'
        },
        get cityName() {
           if(store.additionalSales.tours[0]) {
               return store.additionalSales.tours[0].cityName
           }
           return ''
        },
        get isLoadingBooking() {
            return store.loading.isAdditionalBooking
        },

        get isRedirectToCheckout() {
            return store.loading.isRedirectToCheckout
        }
    }))
}