import {observer} from "mobx-react-lite";
import Button from "@shared/ui/selectors/button/button";
import CalendarSvg from "@/assets/images/svg/calendar-svg";
import TabsLanguagesView from "@entities/lib/calendar/viewmodels/tabs-languages/view";
import HowManyView from "@entities/lib/calendar/viewmodels/how-many/view";
import DeparturesListView from "@entities/lib/calendar/viewmodels/departures/list/view";
import {useDeparturesListProps} from "@entities/lib/calendar/viewmodels/departures/list/use-props";
import {useProcessBookingProps} from "@entities/lib/calendar/viewmodels/root/use-props";

import {
    useCaseCloseDeparturesDay,
    useCaseOpenCalendar, useCaseBooking, useCaseOpenCouponToursModal
} from "@entities/lib/calendar/usecases/modals";
import FormBookingView from "@entities/lib/calendar/viewmodels/form-booking/view";
import CalendarView from "@entities/lib/calendar/viewmodels/calendar/view";
import {useCalendarProps} from "@entities/lib/calendar/viewmodels/calendar/use-props";
import DeparturesDayItemsView from "@entities/lib/calendar/viewmodels/departures/day/view";
import {useDeparturesDayProps} from "@entities/lib/calendar/viewmodels/departures/day/use-props";
import AdditionalSalesRootView from "@entities/lib/calendar/additiona-sales/viewmodels/root/view";
import {useHowManyProps} from "@entities/lib/calendar/viewmodels/how-many/use-props";
import CouponModal from "@entities/paid-tour/ui/modals/coupon-modal";
import {useCaseRedirectToCheckout} from "@entities/lib/calendar/usecases";
import CongratulationsModel from "@entities/paid-tour/ui/modals/congratulations-modal";

import "@/entities/calendar/ui/main/style.css";

const WrapperFixRender = observer(() => {
    return (
        <>
            <AdditionalSalesRootView />
            <FormBookingView/>
        </>
    )
})

const ProcessBookingView = observer(() => {
    const {getters, i18n} = useProcessBookingProps()


    const viewModelDepartures = useDeparturesListProps({
        depModel: getters.depModel,
        loading: getters.loadingModel,
        onBooking: useCaseBooking()
    })

    const redirectToCheckout = useCaseRedirectToCheckout()


    const viewModelDeparturesDay = useDeparturesDayProps({
        depModel: getters.depModel,
        modals: getters.modals,
        onClose: useCaseCloseDeparturesDay(),
        onBooking: useCaseBooking()
    })
    const viewModelCalendar = useCalendarProps();
    const viewModelHowMany =  useHowManyProps();

    const onOpenCalendar = useCaseOpenCalendar();

    const openCouponToursModal = useCaseOpenCouponToursModal();

    return (
        <div className="calendar_wrap" style={{minHeight: '400px'}}>
            {getters.isShowTitle && <h2 className="title">{getters.title}</h2> }
            <div className="wrap-box">
                <Button onClick={onOpenCalendar}>
                    <div className="calendar_icon">
                        <CalendarSvg/>
                    </div>
                    <span>{i18n.pick_a_date}</span>
                </Button>

                <div className="calendar_wrap" style={{minHeight: '400px'}}>
                    <TabsLanguagesView/>
                    <HowManyView viewModel={viewModelHowMany}/>
                    <DeparturesListView viewModel={viewModelDepartures}/>
                </div>
            </div>
            <CalendarView viewModel={viewModelCalendar} size="default">
                <TabsLanguagesView/>
                <HowManyView viewModel={viewModelHowMany}/>
            </CalendarView>
            <DeparturesDayItemsView viewModel={viewModelDeparturesDay}/>
            <WrapperFixRender />
            { getters.isOpenCouponModal.visibly &&
                <CouponModal
                    isLoading={getters.loadingModel.isRedirectToCheckout}
                    model={getters.modelCoupon}
                    onCancel={redirectToCheckout}
                    onConfirm={openCouponToursModal}
                />
            }
            { getters.isOpenCouponToursModal.visibly &&
                <CongratulationsModel
                    isLoading={getters.loadingModel.isRedirectToCheckout}
                    model={getters.modelCoupon}
                />
            }
        </div>
    )
})
export default ProcessBookingView