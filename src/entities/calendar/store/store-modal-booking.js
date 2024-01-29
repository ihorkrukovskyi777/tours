import {makeAutoObservable} from "mobx";
import {fetchBookingDepartures} from "@/entities/calendar/api";

export class StoreModalBooking {
    constructor(locale, depLogic) {
        this.locale = locale
        this.isOpened = false;
        this.departure = null;
        this.depLogic = depLogic;
        makeAutoObservable(this, {}, {autoBind: true});
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

    * fetchBookingDeparture({email, firstName, lastName, phone, phone_county_code, phone_county_slug}) {

        const body = {
            curLang: this.locale,
            dep_id: this.departure.depId,
            tour_id: this.departure.tourId,
            is_civitatis: this.departure.is_civitatis ? '1' : '0',
            number_people: this.depLogic.people,
            email: 'ynherb299@gmail.com',
            first_name: 'Andrian',
            last_name: 'Domashovets',
            phone: '3 2313 123 121',
            phone_county_code: '+44',
            full_time: this.departure.fullTime,
            phone_county_slug: 'gb',
            full_number: "+4432313123121"
        }
        return yield fetchBookingDepartures(body);
    }
}
