'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {ProcessBookingStore} from "@entities/lib/calendar/process-booking.store";
import {ModalStepsModel} from "@entities/lib/calendar/models/modal-steps.model";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {ProcessOption} from "@entities/lib/calendar/@types/process-option";
import {observer} from "mobx-react-lite";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import ProcessBookingView from "@entities/lib/calendar/viewmodels/root/view";
import {LoadingModel} from "@entities/lib/calendar/models/loading.model";
import {BookingFormModel} from "@entities/lib/calendar/models/booking-form.model";
import {AdditionalSalesModel} from "@entities/lib/calendar/additiona-sales/models/additional-sales";
import {CouponModel} from "@entities/lib/calendar/models/coupon.model";

type ContextData = { store: ProcessBookingStore, i18n: { [key in string]: string } };
// @ts-ignore
const ProcessBookingContext = createContext<ContextData>(null)


export function useContextProcessBookingStore() {
    const context = useContext(ProcessBookingContext) as ContextData
    return context?.store as ProcessBookingStore
}

export function useContextProcessBookingI18N() {
    const {i18n} = useContext(ProcessBookingContext)

    return i18n
}


interface Props {
    option: ProcessOption
    i18n: { [key in string]: string }
}

function createProcessBookingStore(option: ProcessOption): ProcessBookingStore {

    const optionModel = new ProcessOptionModel(option);
    return new ProcessBookingStore(
        new ModalStepsModel(),
        optionModel,
        new DeparturesModel(optionModel),
        new LoadingModel(),
        new BookingFormModel(optionModel),
        new AdditionalSalesModel(new ProcessOptionModel(option)),
        new CouponModel(optionModel)
    )
}

const ProcessBookingProvider = observer(({i18n, option}: Props) => {
    const [store] = useState<ProcessBookingStore>(() => createProcessBookingStore(option))

    useEffect(() => {
        const section = document.getElementById('tour_calendar_section');
        if (section && store.option.availableLocale.length === 0) {
            section.style.display = 'none';
        }

        return () => {
            document.body.style.overflow = 'auto'
        }

    }, [])


    if(!store) {
        return null;
    }
    return (
        <ProcessBookingContext.Provider value={{i18n, store}}>
            <ProcessBookingView/>
        </ProcessBookingContext.Provider>
    )
})

export default ProcessBookingProvider