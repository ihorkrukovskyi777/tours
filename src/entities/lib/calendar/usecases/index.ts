import {useContextProcessBookingStore as useContextStore} from "@entities/lib/calendar/process-booking.provider";
import {useCallback} from "react";
import {FormDataBooking} from "@entities/lib/calendar/models/booking-form.model";
import {useRouter} from 'next/navigation'
import {getHrefLocale} from "@/i18n/get-href-locale";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {Day} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {fetchBooking} from "@entities/lib/calendar/api/fetch-booking";
import {DepBooking} from "@entities/lib/calendar/@types";
import {fetchBookingsAdditional} from "@entities/lib/calendar/api/fetch-additionals-booking";
import {ADDITIONAL_ROUTE, CHECKOUT} from "@shared/constants/route";
import {toJS} from "mobx";
export function useFetchDepartures() {
    const store = useContextStore();
    return useCallback(async function () {
        const {loading, depModel} = store;
        loading.set('main')
        try {
            await depModel.fetchDepartures()
        } catch (err) {
            console.error(err)
        } finally {
            loading.turnOff('main')
        }
    }, [store])
}

export function useCaseFetchPhones() {
    const store = useContextStore();
    return useCallback(async function () {
        await store.formBooking.phone.fetchPhones()
    }, [store])
}

export function useCaseChangeLocale() {
    const store = useContextStore();
    return useCallback(async function (locale: string) {
        const {loading, option, depModel} = store
        loading.set('main')
        option.setLocale(locale)
        await depModel.changeLocale()
        loading.turnOff('main')
    }, [store])
}

export function useCaseChangePeople() {
    const store = useContextStore();
    return useCallback(function (people: number) {
        store.option.setPeople(people)
        store.depModel.changePeople()
    }, [store])
}


export function useCaseRedirectToCheckout() {
    const store = useContextStore();
    const {push} = useRouter()
    return useCallback(async function () {
        const booking = store.formBooking.getFirstBooking();
        if (booking) {
            const url = getHrefLocale(store.option.page.locale, `${CHECKOUT}?code=${booking.booking_id}`)
            await push(url)
        }

    }, [])
}

export function useCaseFetchBooking() {
    const store = useContextStore();
    const redirect = useCaseRedirectToCheckout()

    return useCallback(async function (data: FormDataBooking, token: string) {
        try {
            store.loading.set('fetch-booking')
            await store.formBooking.fetchBookingDeparture(data, token)
            const booking = store.formBooking.getFirstBooking();
            if (!booking || !!store.formBooking.errors.length) {
                store.loading.turnOff('fetch-booking')
                return null
            }

            store.additionalSales.setCustomer(booking.customer)
            await store.additionalSales.fetchAnotherTour(booking.booking_id, store.option.page.locale, store.formBooking.tours_ids)
            store.modals.openModal(MODAL.ADDITIONAL_SALES)
            store.modals.closeAllExceptByName(MODAL.ADDITIONAL_SALES)
            store.loading.turnOff('fetch-booking')
            return store.formBooking.getFirstBooking();


        } catch (err) {

            const booking = store.formBooking.getFirstBooking();
            if (booking) {
                await redirect()
            } else {
                store.loading.turnOff('fetch-booking')
            }

        }
    }, [store])
}


export function useCaseOpenDeparturesDayAdditional() {
    const store = useContextStore();
    return useCallback(function (day: Day) {
        store.additionalSales.selectTourCalendar.departuresModel?.departuresCalendar.listByDays.setToursByDay(day)
        store.modals.openModal(MODAL.ADDITIONAL_SALES_DEP_DAY)
    }, [store])
}

export function useCaseFetchBookingAdditional() {
    const store = useContextStore();
    const redirect = useCaseRedirectToCheckout();
    const { push } = useRouter()

    return useCallback(async function (dep: DepBooking) {
        const depModel = store.additionalSales.selectTourCalendar.departuresModel?.departuresCalendar
        const booking = store.formBooking.getFirstBooking();

        if (depModel && booking) {
            try {
                store.loading.set('additional-booking')
                const data = await fetchBooking(booking.customer, '', {
                    ...dep,
                    peopleNumber: depModel.option.peopleNumber,
                    pageLocale: depModel.option.page.locale
                })

                const order = await fetchBookingsAdditional([data.data, ...store.formBooking.bookings])


                if(order) {
                    const url = getHrefLocale(store.option.page.locale, `${ADDITIONAL_ROUTE}/${order}`)
                    await push(url)
                } else {
                    throw new Error()
                }

            } catch (err) {
                await redirect();

            }

        }
    }, [store])
}