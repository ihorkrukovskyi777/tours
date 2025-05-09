import {useContextProcessBookingStore as useContextStore} from "@entities/lib/calendar/process-booking.provider";
import {useCallback} from "react";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";
import {Day} from "@entities/lib/calendar/models/departures/departure-by-day.model";
import {DepBooking} from "@entities/lib/calendar/@types";
import {fetchCategories} from "@entities/lib/calendar/api/fetch-categories";
import {
    CivitatisCategoriesModel,
    ICivitatisCategory,
} from "@entities/lib/calendar/models/civitatis-categories.model";
import {useCaseRedirectToCheckout, useFetchAdditionalRedirect} from "@entities/lib/calendar/usecases/index";
import {useAnalytics} from "@entities/analytics/analytics.provider";


export function useCaseOpenCalendar() {
    const store = useContextStore();
    const analytics = useAnalytics()
    return useCallback(function () {
        store.modals.openModal(MODAL.CALENDAR)
        analytics?.addEventNoLastDuplicate({
            type: 'click_pick_a_date'
        })
    }, [store])
}

export function useCaseOpenCouponModal() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.openModal(MODAL.COUPON_MODAL)
        store.modals.closeAllExceptByName(MODAL.COUPON_MODAL)
    }, [store])
}

export function useCaseCloseModelEmailCoupon() {
    const store = useContextStore();
    const redirectToCheckout = useCaseRedirectToCheckout()
    return useCallback(async function () {

        store.modals.closeModal(MODAL.SUCCESS_SEND_EMAIL)
        await redirectToCheckout();
    }, [store])
}
export function useCaseOpenCouponToursModal() {
    const store = useContextStore();
    const redirectToCheckout = useCaseRedirectToCheckout()
    const setAdditionalBooking = useFetchAdditionalRedirect();
    return useCallback(async function () {
        const booking = store.formBooking.getLastBooking();

        if(!booking) {
            await redirectToCheckout();
            return
        }
        store.loading.set('redirect-to-checkout')


        if(!store.couponModel.additionalOrderId)
            await setAdditionalBooking(store.formBooking.bookings.map(item => ({
                type: item.type,
                booking_id: item.booking_id
            })))

        try {
            await store.couponModel.fetchCreateCoupon(booking.booking_id)

            store.modals.closeAllExceptByName(MODAL.PAID_TOURS_MODAL)
            store.modals.openModal(MODAL.PAID_TOURS_MODAL)
            store.loading.turnOff('redirect-to-checkout')
        } catch (err) {

            await redirectToCheckout()
        }
    }, [store])
}
export function useCaseCloseCalendar() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.CALENDAR)

    }, [store])
}

export function useCaseCloseDeparturesDay() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.DAY_LIST)


    }, [store])
}

export function useCaseOpenDeparturesDay() {
    const store = useContextStore();
    return useCallback(function (dep: Day) {
        store.depModel.listByDays.setToursByDay(dep)
        store.modals.openModal(MODAL.DAY_LIST)
    }, [store])
}

export function useCaseChangeModalBooking() {
    const store = useContextStore();
    const onCloseBooking = useCaseCloseModalBooking()
    const onOpenCalendar = useCaseOpenCalendar()
    return useCallback(function () {
        if (store.modals.modals[MODAL.DAY_LIST].visibly) {
            onCloseBooking()
        } else {
            onCloseBooking()
            onOpenCalendar()
        }

    }, [store])
}

export function useCaseCloseModalBooking() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.FORM_BOOKING)
    }, [store])
}

export function useCaseBooking() {
    const store = useContextStore();
    return useCallback(async function (dep: DepBooking) {
        store.modals.openModal(MODAL.FORM_BOOKING)

        if(Number(dep.is_civitatis) === 1) {
            store.formBooking.setDeparture(dep)
            store.loading.set('loading-categories')
            const categories = await fetchCategories(dep.depId, store.option.page.locale)
            store.formBooking.setCategories(categories.map(rate => new CivitatisCategoriesModel(rate.rate_id, rate.text,rate.categories, store.option.peopleNumber, dep.maxPerBooking)))
            store.loading.turnOff('loading-categories')
        } else {
            store.formBooking.setDeparture(dep)

        }
    }, [store])
}

export function useCaseNextCivitatisAdditionalBooking() {
    const store = useContextStore();
    const setAdditionalBooking = useFetchAdditionalRedirect();
    const analytics = useAnalytics()

    return useCallback(async function (dep: DepBooking, prevCategories: ICivitatisCategory[], peopleNumber: number) {
        if(Number(dep.is_civitatis) === 1) {
            store.formBooking.setDeparture(dep)
            store.loading.set('loading-categories')
            const categories = await fetchCategories(dep.depId, store.option.page.locale)


            store.formBooking.setCategories(categories.map(rate => new CivitatisCategoriesModel(rate.rate_id, rate.text,rate.categories, peopleNumber, dep.maxPerBooking)))
            store.formBooking.civitatisCategorySelected?.setDistributeByCategories(peopleNumber, prevCategories)

            const orEqual = prevCategories.filter(cat => {
                return !store.formBooking.civitatisCategorySelected?.categories.some(item => {
                    return (item.text.toLowerCase() === cat.text.toLowerCase() && item.count === cat.count && item.canBookAlone === cat.canBookAlone)
                })
            }).length === 0;

            const firstBooking = store.formBooking.getFirstBooking();
            if(orEqual && !!prevCategories.length && firstBooking) {
                await store.formBooking.fetchBookingDeparture(firstBooking.customer, '')
                analytics?.addEvent({
                    type: 'additional_booking'
                })
                await setAdditionalBooking(store.formBooking.bookings.map(item => ({type: item.type, booking_id: item.booking_id})))
                return
            }
            store.modals.openModal(MODAL.FORM_BOOKING)

            store.loading.turnOff('loading-categories')


        }
    }, [store])
}


export function useCaseCloseModalAdditional() {
    const store = useContextStore();
    const redirectToCheckout = useCaseRedirectToCheckout()
    return useCallback(async function () {
        store.modals.closeModal(MODAL.ADDITIONAL_SALES)
        await redirectToCheckout();


    }, [store])
}

export function useCaseOpenAdditionalCalendar() {
    const store = useContextStore();
    return useCallback(async function (id: number) {
        try {
            store.loading.set('additional')
            store.modals.openModal(MODAL.ADDITIONAL_SALES_CALENDAR)
            await store.additionalSales.setCalendarTourId(id);

        } catch (err) {
            console.log(err)
        } finally {
            store.loading.turnOff('additional')
        }
    }, [store])
}


export function useCaseAdditionalCloseCalendar() {
    const store = useContextStore();
    return useCallback(function () {
        store.modals.closeModal(MODAL.ADDITIONAL_SALES_CALENDAR)
    }, [store])
}