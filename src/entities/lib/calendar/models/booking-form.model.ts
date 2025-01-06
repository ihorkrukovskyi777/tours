import {makeAutoObservable, runInAction, toJS} from "mobx";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import { DepBooking} from "@entities/lib/calendar/@types";
import {fetchBooking} from "@entities/lib/calendar/api/fetch-booking";
import {
    CivitatisCategoriesModel,
    ICivitatisCategory,
} from "@entities/lib/calendar/models/civitatis-categories.model";

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
    civitatis_categories: ICivitatisCategory[]
    tour_id: number
}

export class BookingFormModel {
    departure: DepBooking | null
    errors: string[]
    phone: StorePhone;

    bookings: Booking[] = [];

    civitatisCategories: CivitatisCategoriesModel[] = [];
    civitatisCategorySelected: CivitatisCategoriesModel | null = null;

    lastBookingPeopleNumber: number | null = null

    constructor(readonly option: ProcessOptionModel) {
        this.departure = null;
        this.phone = new StorePhone(option.page.locale)
        this.errors = [];
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setCategories(categories: CivitatisCategoriesModel[]) {
        this.civitatisCategories = categories
        if (categories.length) {
            this.civitatisCategorySelected = categories[0]
        }
    }

    get lastBookingCivCategories() {

        return [...this.bookings].findLast(book => !!book.civitatis_categories.length)?.civitatis_categories ?? []
    }

    setDeparture(dep: DepBooking | null) {
        this.reset()
        this.departure = dep;
    }

    reset() {
        this.civitatisCategories = [];
        this.civitatisCategorySelected = null
        this.departure = null
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


        const peopleNumber = this.civitatisCategorySelected?.peopleNumber ?? this.option.peopleNumber

        const results = await fetchBooking(data, token, {
            ...this.departure,
            pageLocale: this.option.page.locale,
            peopleNumber: peopleNumber,
            civitatisCategories: this.civitatisCategorySelected?.dataRate
        });

        if (!!results.success === false) {
            this.errors = Object.values(results.errors)
            return null
        }
        runInAction(() => {
            this.lastBookingPeopleNumber = peopleNumber
            this.bookings.push({...results.data, civitatis_categories: this.civitatisCategorySelected?.notEmptyCategories ?? []})
        })
        return results
    }
}
