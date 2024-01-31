import {makeAutoObservable} from "mobx";
import {StorePhone} from "@/entities/calendar/store/store-phone";
import {StoreTourLogic} from "@/entities/calendar/store/store-tour-logic";
import {pad2, setFormatDDMMYYYYtoMMDDYYYY, toHoursAndMinutes} from "@/shared/hepers/date";
import {cancelBook, fetchEditBooking} from "@/entities/checkout/api";
import {fetchBookingDepartures} from "@/entities/calendar/api";

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
                    start_time,
                    depId,
                }) {
        this.depId = depId;
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
        return this.coordinates?.lat && this.coordinates?.lng;
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
        this.chooseDateModal = false;
        makeAutoObservable(this, {}, {autoBind: true})
    }

    toggleModalChoose() {
        this.chooseDateModal = !this.chooseDateModal
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
    constructor({
                    start_time,
                    activity_date,
                    number_people,
                    phone,
                    name,
                    last_name,
                    email,
                    country_code,
                    subVendor,
                    phone_county_slug,
                    depId,
                    tour_id,
                    is_civitatis
                }, tourLocale, locale, staticCode) {
        this.staticCode = staticCode
        this.loading = false;
        this.edit = depId;
        this.editCivitatis = is_civitatis;
        this.depId = depId;
        this.startTime = start_time;
        this.firstName = name;
        this.lastName = last_name;
        this.email = email
        this.activityDate = activity_date;
        this.numberPeople = Number(number_people);
        this.phone = phone
        this.dialCode = country_code;
        this.countrySlug = phone_county_slug;
        this.locale = locale;
        this.tourLocale = tourLocale;
        this.tourId = tour_id;
        this.is_civitatis = is_civitatis;
        this.storeDepLogic = new StoreTourLogic(tourLocale, 'checkout', tour_id, Number(number_people))
        this.fullTime = is_civitatis ? activity_date : '';
        this.cancelMessage = '';
        this.oldSubVendor = subVendor;
        this.date = {
            month: null,
            year: null,
        }
        this.selectedDay = null;
        makeAutoObservable(this, {}, {autoBind: true})


    }

    get isEdit() {
        return Number(this.edit) === Number(this.depId)
    }
    getCancelMessage(dep) {
        if(this.editCivitatis === false && this.is_civitatis) {
            return 'Booking changed to civitatis';
        }
        else if(Number(this.oldSubVendor) !== Number(dep.subVendorId)) {
            return 'Booking changed to another subvendor';
        } else if (Number(this.isEdit) !== dep.depId && this.editCivitatis === false) {
            return `Tour guest changed departure to DepartureID # ${dep.depId}`
        }
        return null;
    }
    saveNewDep(newDep) {
        this.resetSelectedDay();
        this.depId = newDep.depId;
        this.tourId = newDep.tourId;
        this.numberPeople = this.storeDepLogic.people;
        this.is_civitatis = newDep.is_civitatis
        this.fullTime = newDep.fullTime ?? ''
        this.cancelMessage = this.getCancelMessage(newDep)
        const {hours, minutes} = toHoursAndMinutes(newDep.time)
        this.activityDate = `${setFormatDDMMYYYYtoMMDDYYYY(newDep.date)} ${pad2(hours)}:${pad2(minutes)}:00`
    }

    * updateDeparture() {
        const body = {
            curLang: this.locale,
            dep_id: this.depId,
            tour_id: this.tourId,
            is_civitatis: this.is_civitatis ? 1 : 0,
            number_people: this.numberPeople,
            email: this.email,
            first_name: this.firstName,
            last_name: this.lastName,
            phone: this.phoneNumber,
            phone_county_code: this.dialCode,
            full_time: this.fullTime,
            phone_county_slug: this.countrySlug,
            full_number: this.phone,
        }

        try {
            this.loading = true;
            if (this.isEdit && !this.editCivitatis) {
                return yield fetchEditBooking({...body, code: this.staticCode});
            } else {
                if(this.is_civitatis || this.editCivitatis) {
                    return yield this.bookingAndCancel(body, this.cancelMessage);
                } else {
                    return yield this.bookingAndCancel(body, this.cancelMessage);
                }

            }
        } catch (err) {
            console.log(err);
        } finally {
            this.loading = false;
        }
    }
    * cancelAndBookCivitatis(body, cancelMessage) {
        try {
            yield cancelBook(this.staticCode, cancelMessage)
            const data = yield fetchBookingDepartures(body);

            return data;
        } catch (err) {
            { success: false}
        }
    }
    * bookingAndCancel(body, cancelMessage) {
        try {
            const data = yield fetchBookingDepartures(body);
            if(data.success === false) {
                return { success: false, errors: data.errors ?? true};
            }
            yield cancelBook(this.staticCode, cancelMessage)
            return data;
        } catch (err) {
            return { success: false}
        }
    }

    resetSelectedDay() {
        this.selectedDay = null;
    }

    setSelectedDay(fullDate) {
        this.selectedDay = fullDate
    }

    get departureByDay() {
        if (this.selectedDay === null) {
            return [];
        }
        return Object.values(this.storeDepLogic.getToursByDay(this.selectedDay)).flat()
    }

    changeMonthAndYearn({month, year}) {
        this.date = {
            year,
            month,
        }
    }

    changePeopleNumber(val) {
        this.numberPeople = val;
        this.storeDepLogic.changePeople(val);
    }

    get departures() {
        if (this.date.month === null || this.date.year === null) {
            return [];
        }

        const month = this.date.month
        const year = this.date.year
        let dataPrevMonth = month - 1;
        let prevYear = year


        if (month === 1) {
            dataPrevMonth = 12;
            prevYear = prevYear - 1;
        }

        let dataNextMonth = month + 1
        let nextYear = year
        if (month === 12) {
            dataNextMonth = 1;
            nextYear = nextYear + 1;
        }

        return {
            ...this.storeDepLogic.getTourByMonthAndYear(dataPrevMonth, prevYear, this.storeDepLogic.departureIterable),
            ...this.storeDepLogic.getTourByMonthAndYear(month, year),
            ...this.storeDepLogic.getTourByMonthAndYear(dataNextMonth, nextYear),
        }
    }

    fetchDepartures() {
        this.storeDepLogic.fetchDepartures();
    }

    get phoneNumber() {
        return this.phone.replace(this.dialCode, '');
    }

    changeCountryCode({dialCode, countrySlug}) {
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
        this.phone = value;
    }

}

export default class CheckoutStore {
    checkoutInfo = null;
    editDeparture = null;
    tourLogic = null

    constructor(locale, tourLocale) {
        this.locale = locale
        this.tourLocale = tourLocale
        this.globalLoading = true;
        this.isActiveCheckout = true;
        this.isContactGuide = false
        this.managerModal = new ManagerModal();
        this.pageOptions = {};

        this.phone = new StorePhone(locale)
        makeAutoObservable(this, {}, {autoBind: true})
    }
    * fetchCheckoutDetails(staticCode) {
        this.globalLoading = true;
        const url = `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${staticCode}?locale=${this.locale}`;
        let data = yield fetch(url, {next: {revalidate: 0}})
        data = yield data.json();
        this.isActiveCheckout = data.show_button;
        this.pageOptions = data.pageOptions;
        this.checkoutInfo = new CheckoutInfo(data);
        this.isContactGuide = !data.is_civitatis
        this.editDeparture = new EditDeparture(data, this.tourLocale, this.locale, staticCode)
        this.editDeparture.fetchDepartures();
        this.globalLoading = false;
    }
}