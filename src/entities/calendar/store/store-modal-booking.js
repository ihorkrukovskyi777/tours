import {makeAutoObservable} from "mobx";
import {fetchBookingDepartures} from "@/entities/calendar/api";
import {sendEventsGTM} from "@/shared/helpers/google/send-event";
export class StoreModalBooking {
    constructor(locale, depLogic, localeError) {
        this.locale = locale
        this.isOpened = false;
        this.departure = null;
        this.depLogic = depLogic;
        this.errors = [];
        this.localeError = localeError;
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

    * fetchBookingDeparture(data, token) {
        this.toggleLoading();
        const {email, firstName, lastName, phone, phone_county_code, phone_country_slug, tourName} = data;
        this.errors = [];
        const body = {
            curLang: this.localeError,
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
            full_number: `${phone_county_code}${phone}`,
            page: 'tour',
            token,
        }


        const results =  yield fetchBookingDepartures(body);
        try {
            sendEventsGTM({
                eventName: 'add_booking',
                bookID: results.booking_id,
                firstName,
                lastName,
                tourName,
                phoneNumber: phone,
                numberOfPeople: this.depLogic.people,
            })
        } catch (err) {
            console.log(err)
        }
        if(!!results.success === false) {
            this.errors = Object.values(results.errors)
            this.toggleLoading();
        }

        return results
    }
}
