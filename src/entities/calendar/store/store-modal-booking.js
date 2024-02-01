import {makeAutoObservable} from "mobx";
import {fetchBookingDepartures} from "@/entities/calendar/api";

export class StoreModalBooking {
    constructor(locale, depLogic) {
        this.locale = locale
        this.isOpened = false;
        this.departure = null;
        this.depLogic = depLogic;
        this.errors = [];
        this.loadingBooking = false;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    get selectedLocale() {
        return this.depLogic.locale
    }
    setDeparture(dep) {
        this.departure = dep;
    }

    open() {
        this.isOpened = true;
    }

    close() {
        this.isOpened = false
    }

    toggleLoading() {
        this.loadingBooking = !this.loadingBooking;
    }

    * fetchBookingDeparture(data) {
        this.toggleLoading();
        console.log(this.loading);
        const {email, firstName, lastName, phone, phone_county_code, phone_country_slug} = data;
        this.errors = [];
        const body = {
            curLang: this.locale,
            dep_id: this.departure.depId,
            tour_id: this.departure.tourId,
            is_civitatis: this.departure.is_civitatis ? 1 : 0,
            number_people: this.depLogic.people,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            phone_county_code: phone_county_code,
            full_time: this.departure.fullTime ?? '',
            phone_county_slug: phone_country_slug,
            full_number: `${phone_county_code}${phone}`
        }
        const results =  yield fetchBookingDepartures(body);

        if(!!results.success === false) {
            this.errors = Object.values(results.errors)
        }
        this.toggleLoading();

        return results
    }
}
