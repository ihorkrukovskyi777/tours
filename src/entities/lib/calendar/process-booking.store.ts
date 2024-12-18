import {ModalStepsModel} from "@entities/lib/calendar/models/modal-steps.model";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {LoadingModel} from "@entities/lib/calendar/models/loading.model";
import {BookingFormModel} from "@entities/lib/calendar/models/booking-form.model";
import {AdditionalSalesModel} from "@entities/lib/calendar/additiona-sales/models/additional-sales";

export class ProcessBookingStore {


    constructor(
        readonly modals: ModalStepsModel,
        readonly option: ProcessOptionModel,
        readonly depModel: DeparturesModel,
        readonly loading: LoadingModel,
        readonly formBooking: BookingFormModel,
        readonly additionalSales: AdditionalSalesModel,
    ) {}
}