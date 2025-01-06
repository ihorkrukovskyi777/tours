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
import {useCaseRedirectToCheckout} from "@entities/lib/calendar/usecases";
import '@entities/lib/calendar/styles/additional-sales-list.css'


const ModalListToursView = observer(() => {

    const [init, setInit] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)

    const i18n = useContextProcessBookingI18N()
    const viewModel = useAdditionalSalesProps();
    const onClose = useCaseCloseModalAdditional()

    const onOpenCalendar = useCaseOpenAdditionalCalendar()
    const redirectToCheckout = useCaseRedirectToCheckout();

    useEscHooks()

    const getLink = (value: string) => {
        const stringExtractor = extract(['%', '%'])
        const text = stringExtractor(value);

        return `${value.replaceAll(`%${text}%`, `<span >${text}</>`)}`
    }

    useEffect(() => {
        setInit(true)
    }, [])

    // useEffect(() => {
    //     const redirect = async () => {
    //         await push(viewModel.linkCity)
    //     }
    //     ref.current?.addEventListener('click', redirect)
    //
    //     return () => ref.current?.removeEventListener('click', redirect)
    //
    // }, [ref.current])

    if (!init) return null;


    return (
        <ModalBooking
            show={viewModel.isOpen}
            size={'step-1'}
            halfOpacity={viewModel.halfOpacity}
            close={onClose}
        >

            <div className="step-1 default additional_sales_list">
                <div className="close-button" onClick={onClose}><CloseSvg/></div>
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
                <button className="additional_sales_list__no_thanks" onClick={redirectToCheckout}>{i18n.no_thanks.toLowerCase()}</button>
            </div>
        </ModalBooking>
    )
})

export default ModalListToursView