import {useContextProcessBookingStore as useContextStore} from "@entities/lib/calendar/process-booking.provider";
import {useCallback} from "react";
import {FormDataBooking} from "@entities/lib/calendar/models/booking-form.model";
import {useRouter} from 'next/navigation'
import {getHrefLocale} from "@/i18n/get-href-locale";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {Day} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {fetchBooking} from "@entities/lib/calendar/api/fetch-booking";
import {DepBooking} from "@entities/lib/calendar/@types";
import {BookingsAdditionalDto, fetchBookingsAdditional} from "@entities/lib/calendar/api/fetch-additionals-booking";
import {ADDITIONAL_ROUTE, CHECKOUT} from "@shared/constants/route";
import {
    useCaseNextCivitatisAdditionalBooking, useCaseOpenCouponModal
} from "@entities/lib/calendar/usecases/modals";
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

export function useCaseFetchCouponModal() {
    const openCouponModal = useCaseOpenCouponModal()
    const redirectToCheckout = useCaseRedirectToCheckout()
    const store = useContextStore();
    return useCallback(async function () {
        if (!store.couponModel.isEmpty) {
            openCouponModal();
        } else {
            await redirectToCheckout()
        }
    }, [])
}


export function useCaseDeclineCouponForBooking() {
    const store = useContextStore();
    const redirectToCheckout = useCaseRedirectToCheckout()
    return useCallback(async function () {
        store.loading.set('redirect-to-checkout')

        if (store.formBooking.bookings.length < 2) {
            store.couponModel.removeOrder();
        }
        await store.couponModel.fetchDecline()
        await redirectToCheckout();
    }, [])
}

export function useCaseSendCouponEmail() {
    const store = useContextStore();
    const redirectToCheckout = useCaseRedirectToCheckout()
    return useCallback(async function () {
        try {
            store.loading.set('redirect-to-checkout')
            await store.couponModel.sendEmail()
            store.modals.openModal(MODAL.SUCCESS_SEND_EMAIL)
            if (store.formBooking.bookings.length < 2) {
                store.couponModel.removeOrder();
            }
            store.loading.turnOff('redirect-to-checkout')
        } catch (err) {
            await redirectToCheckout()
        }
    }, [])
}

export function useCaseRedirectToCheckout() {
    const store = useContextStore();
    const {push} = useRouter()
    return useCallback(async function () {
        store.loading.set('redirect-to-checkout')
        const order = store.couponModel.additionalOrderId
        if (order) {
            const url = getHrefLocale(store.option.page.locale, `${ADDITIONAL_ROUTE}/${order}`)
            await push(url)
        } else {
            const booking = store.formBooking.getFirstBooking();
            if (!booking) return
            const url = getHrefLocale(store.option.page.locale, `${CHECKOUT}?code=${booking.booking_id}`)
            await push(url)
        }

    }, [])
}

export function useCaseFetchBooking() {
    const store = useContextStore();
    const redirect = useCaseRedirectToCheckout()
    const setAdditionalBooking = useFetchAdditionalRedirect();
    const openCouponModel = useCaseOpenCouponModal()
    return useCallback(async function (data: FormDataBooking, token: string) {
        try {
            store.loading.set('fetch-booking')
            await store.formBooking.fetchBookingDeparture(data, token)

            if (store.formBooking.bookings.length > 1) {
                await setAdditionalBooking(store.formBooking.bookings.map(item => ({
                    type: item.type,
                    booking_id: item.booking_id
                })))
                return;
            }


            const booking = store.formBooking.getFirstBooking();

            if (!booking || !!store.formBooking.errors.length) {
                store.loading.turnOff('fetch-booking')
                return null
            }

            await store.couponModel.fetchPaidModal(booking.tour_id)


            store.additionalSales.option.setPeople(store.formBooking.lastBookingPeopleNumber ?? 1)
            store.additionalSales.setCustomer(booking.customer)
            await store.additionalSales.fetchAnotherTour(booking.booking_id, store.option.page.locale, store.formBooking.tours_ids)
            store.modals.openModal(MODAL.ADDITIONAL_SALES)
            store.modals.closeAllExceptByName(MODAL.ADDITIONAL_SALES)
            store.loading.turnOff('fetch-booking')
            return store.formBooking.getFirstBooking();


        } catch (err) {

            const booking = store.formBooking.getFirstBooking();

            if (!store.couponModel.isEmpty) {
                openCouponModel();
            } else if (booking) {
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

export function useFetchAdditionalRedirect() {
    const store = useContextStore()
    const {push} = useRouter()
    const redirect = useCaseRedirectToCheckout();
    const openCouponModal = useCaseOpenCouponModal()

    return useCallback(async function (bookings: BookingsAdditionalDto[]) {
        try {
            const order = await fetchBookingsAdditional(bookings)

            if (!store.couponModel.isEmpty) {
                store.couponModel.setOrderLink(order)
                openCouponModal();
            } else if (order) {
                const url = getHrefLocale(store.option.page.locale, `${ADDITIONAL_ROUTE}/${order}`)
                await push(url)
            } else {
                throw new Error()
            }
        } catch (err) {
            await redirect();
        }
    }, [])
}

export function useCaseFetchBookingAdditional() {
    const store = useContextStore();
    const redirect = useCaseRedirectToCheckout();
    const nextCivitatisAdditionalBooking = useCaseNextCivitatisAdditionalBooking();
    const setAdditionalBooking = useFetchAdditionalRedirect();

    return useCallback(async function (dep: DepBooking) {
        const depModel = store.additionalSales.selectTourCalendar.departuresModel?.departuresCalendar
        const booking = store.formBooking.getFirstBooking();
        if (depModel && booking) {
            try {
                if (!dep.is_civitatis) {
                    store.loading.set('additional-booking')
                    const data = await fetchBooking(booking.customer, '', {
                        ...dep,
                        peopleNumber: depModel.option.peopleNumber,
                        pageLocale: depModel.option.page.locale,
                        civitatisCategories: undefined
                    })
                    store.formBooking.addBooking({
                        type: 'oneport',
                        ...data.data,
                        civitatis_categories: [],
                    })
                    await setAdditionalBooking(store.formBooking.bookings.map(item => ({
                        type: item.type,
                        booking_id: item.booking_id
                    })))
                } else {
                    store.loading.set('additional-booking')
                    await nextCivitatisAdditionalBooking(dep, store.formBooking.lastBookingCivCategories, depModel.option.peopleNumber)
                    store.loading.turnOff('additional-booking')
                }

            } catch (err) {
                await redirect();
            }

        }
    }, [store])
}