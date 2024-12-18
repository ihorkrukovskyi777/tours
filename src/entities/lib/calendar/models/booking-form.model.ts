import {makeAutoObservable} from "mobx";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {DepBooking} from "@entities/lib/calendar/@types";
import {fetchBooking} from "@entities/lib/calendar/api/fetch-booking";

export interface FormDataBooking {
    tourName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone_county_code: string,
    phone: string,
    phone_country_slug: string
}

interface Booking {
    type: 'civitatis' | 'oneport'
    booking_id: string
    customer: FormDataBooking

    tour_id: number
}

export class BookingFormModel {
    departure: DepBooking | null
    errors: string[]
    phone: StorePhone;

    bookings: Booking[] = [];

    constructor(readonly option: ProcessOptionModel) {
        this.departure = null;
        this.phone = new StorePhone(option.page.locale)
        this.errors = [];
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setDeparture(dep: DepBooking | null) {
        this.departure = dep;
    }

    reset() {
        this.bookings = []
        this.setDeparture(null)
    }

    getFirstBooking() {
        if (this.bookings.length)
            return this.bookings[0];

        return null
    }

    get tours_ids() {
        return this.bookings.map(item => item.tour_id)
    }

    async fetchBookingDeparture(data: FormDataBooking, token: string): Promise<{ booking_id: string } | null> {
        if (!this.departure) {
            return null
        }

        this.errors = [];


        const results = await fetchBooking(data, token, {
            ...this.departure,
            pageLocale: this.option.page.locale,
            peopleNumber: this.option.peopleNumber
        });

        if (!!results.success === false) {
            this.errors = Object.values(results.errors)
            return null
        }
        this.bookings.push(results.data)
        return results
    }
}
