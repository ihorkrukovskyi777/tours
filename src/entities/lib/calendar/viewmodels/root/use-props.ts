import {
    useContextProcessBookingI18N,
    useContextProcessBookingStore as useContextStore
} from "@entities/lib/calendar/process-booking.provider";
import {useLocalObservable} from "mobx-react-lite";
import {useEffect} from "react";
import {useCaseFetchPhones, useFetchDepartures} from "@entities/lib/calendar/usecases";
import {MODAL} from "@entities/lib/calendar/models/modal-steps.model";

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
            get isShowTitle() {
              return !store.option.page.isGuide
            },
            get depModel() {
                return store.depModel
            },
            get modelCoupon() {
                return store.couponModel
            },
            get formBooking() {
                return store.formBooking
            },
            get loadingModel() {
                return store.loading
            },
            get modals() {
                return store.modals
            },
            get isOpenCouponModal() {
                return store.modals.modals[MODAL.COUPON_MODAL].visibly
            },
            get isOpenCouponToursModal() {
                return store.modals.modals[MODAL.PAID_TOURS_MODAL].visibly
            },
            get isOpenCouponModalEmail() {
                return store.modals.modals[MODAL.SUCCESS_SEND_EMAIL].visibly
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