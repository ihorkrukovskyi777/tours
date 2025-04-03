'use client'
import {observer} from "mobx-react-lite";
import ModalBooking from "@entities/calendar/ui/modal-booking";
import CloseSvg from "@/assets/images/svg/close-svg";
import {useContextProcessBookingI18N} from "@entities/lib/calendar/process-booking.provider";
import {useAdditionalSalesProps} from "@entities/lib/calendar/additiona-sales/viewmodels/root/use-props";
import {useCaseCloseModalAdditional, useCaseOpenAdditionalCalendar} from "@entities/lib/calendar/usecases/modals";
import AdditionalSaleCard from "@entities/lib/calendar/ui/additional-card";
import useEscHooks from "@shared/hooks/use-esc-event";
import ProcessBookingLine from "@entities/lib/calendar/ui/process-booking-line";
import {extract} from "@shared/helpers/index"
import {useEffect,  useRef, useState} from "react";
import {useCaseFetchCouponModal} from "@entities/lib/calendar/usecases";
import Loader from '@shared/ui/loaders/default-loader';
import '@entities/lib/calendar/styles/additional-sales-list.css'
import {useAnalytics} from "@entities/analytics/analytics.provider";


const ModalListToursView = observer(() => {

    const [init, setInit] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)
    const analytics = useAnalytics();

    const i18n = useContextProcessBookingI18N()
    const viewModel = useAdditionalSalesProps();
    const onClose = useCaseCloseModalAdditional()

    const onOpenCalendar = useCaseOpenAdditionalCalendar()
    const openCouponModal = useCaseFetchCouponModal();

    useEscHooks()

    const closeHandler = async () => {
        analytics?.addEventNoLastDuplicate({
            type: 'closed_additional_sales'
        })
        await onClose();
    }

    const getLink = (value: string) => {
        const stringExtractor = extract(['%', '%'])
        const text = stringExtractor(value);

        return `${value.replaceAll(`%${text}%`, `<span >${text}</>`)}`
    }


    const notThanksHandler = async () => {
        analytics?.addEventNoLastDuplicate({
            type: 'closed_additional_sales'
        })
        await openCouponModal()
    }

    useEffect(() => {
        setInit(true)
    }, [])


    if (!init) return null;


    return (
        <ModalBooking
            show={viewModel.isOpen}
            size={'step-1'}
            style={{position: 'relative'}}
            halfOpacity={viewModel.halfOpacity}
            close={closeHandler}
            loader={viewModel.isRedirectToCheckout && <Loader style={{left: 0, zIndex: 5, opacity: '0.7'}}/>}
        >
            <div className="step-1 default additional_sales_list">

                <div className="close-button" onClick={closeHandler}><CloseSvg/></div>
                <ProcessBookingLine title={i18n.booking_confirmed_} step={2}/>
                <div className="additional_sales_list__content">
                    <div className="title_text">
                        {i18n.book_another_tour}
                    </div>
                    <div className="paragraph">
                        <p ref={ref} dangerouslySetInnerHTML={{__html: getLink(i18n.discover_more_popular.replaceAll('%city%', viewModel.cityName))}}></p>
                        <p>{i18n.unsure_of_your_plans}</p>
                    </div>
                </div>
                <div className="additional_sales_list__tours">
                    {viewModel.tourList.map(item => {
                        return (
                            <AdditionalSaleCard
                                isLoading={viewModel.isLoadingBooking}
                                key={item.data.id}
                                onOpenCalendar={onOpenCalendar}
                                nameDayWeek={viewModel.nameDayWeek}
                                tour={item}
                            />
                        )
                    })}
                </div>
                <button className="additional_sales_list__no_thanks" onClick={notThanksHandler}>{i18n.no_thanks.toLowerCase()}</button>
            </div>
        </ModalBooking>
    )
})

export default ModalListToursView