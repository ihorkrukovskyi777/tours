import {makeAutoObservable} from "mobx";
import {StorePhone} from "@/entities/calendar/store/store-phone";
class CheckoutInfo {
    constructor({
                    name,
                    last_name,
                    number_people,
                    phone,
                    email,
                    book_id,
                    tour_name,
                    language,
                    date,
                    time,
                    duration,
                    brand_name,
                    brand_logo_url,
                    averge_rating,
                    mpv_image,
                    gps_coordinates,
                    address,
                    location_description,
                    activity_date,
                    start_time
                }) {
        this.activityDate = activity_date;
        this.startTime = start_time;
        this.firstName = name;
        this.lastName = last_name;
        this.numberPeople = number_people;
        this.email = email;
        this.bookingId = book_id
        this.tourName = tour_name;
        this.language = language;
        this.date = date;
        this.time = time
        this.phone = phone;
        this.duration = duration
        this.brandName = brand_name;
        this.brandLogo = brand_logo_url?.url ?? ''
        this.rating = averge_rating;
        this.mpvImage = mpv_image
        this.coordinates = gps_coordinates;
        this.address = address;
        this.locationDescription = location_description;
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isShowMap() {
        return this.coordinates?.lat && this.coordinates?.lang;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    get ratingValue() {
        return this.rating?.averge_rating || 0;
    }

    get isShowRating() {
        return this.rating?.cnt_reviews > 0
    }

}

class ManagerModal {
    constructor() {
        this.modalMessage = false;
        this.modalThankYou = false;
        this.modalEdit = false;
        makeAutoObservable(this, {}, {autoBind: true})
    }

    toggleModalMessage() {
        this.modalMessage = !this.modalMessage;
    }
    toggleModalThankYou() {
        this.modalThankYou = !this.modalThankYou;
    }

    toggleModalEdit() {
        this.modalEdit = !this.modalEdit;
    }
}

class EditDeparture {
    constructor({ start_time, activity_date, number_people, phone, name, last_name, email, country_code, phone_county_slug }) {
        this.startTime = start_time;
        this.firstName = name;
        this.lastName = last_name;
        this.email = email
        this.activityDate = activity_date;
        this.numberPeople = number_people;
        this.phone = phone
        this.dialCode = country_code;
        this.countrySlug = phone_county_slug;
        makeAutoObservable(this, {}, {autoBind: true})

    }
    get phoneNumber() {
        return this.phone.replace(this.dialCode, '');
    }
    get selectedDate() {
        return `${this.activityDate}, ${this.startTime}`
    }
    changeCountryCode({ dialCode, countrySlug}){
        this.dialCode = dialCode;
        this.countrySlug = countrySlug;
    }
    setFirstName(value) {
        this.firstName = value;
    }

    setLastName(value) {
        this.lastName = value;
    }

    setEmail(value) {
        this.email = value
    }
    setPhone(value) {
        console.log(value, 'dsadsa')
        this.phone = value;

        console.log(this.phone, 'phones')
    }

}

export default class CheckoutStore {
    checkoutInfo = null;
    editDeparture = null;
    constructor(locale) {
        this.globalLoading = true;
        this.isActiveCheckout = true;
        this.isContactGuide = false
        this.managerModal = new ManagerModal();
        this.phone = new StorePhone(locale)
        makeAutoObservable(this, {}, {autoBind: true})
    }

    toggleGlobalLoading() {
        this.globalLoading = !this.globalLoading;
    }
    * fetchCheckoutDetails(staticCode) {
        const url = `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${staticCode}`;
        let data = yield fetch(url, {next: {revalidate: 0}})
        data = yield data.json();
        this.isActiveCheckout = data.show_button;
        this.checkoutInfo = new CheckoutInfo(data);
        this.isContactGuide = !data.is_civitatis
        this.editDeparture = new EditDeparture(data)
    }
}