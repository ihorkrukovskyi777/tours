import {fetchBookingDepartures} from "@entities/calendar/api";
import {sendEventsGTM} from "@shared/helpers/google/send-event";
import {FormDataBooking} from "@entities/lib/calendar/models/booking-form.model";
import {DepBooking} from "@entities/lib/calendar/@types";
import {toJS} from "mobx";


interface DepData extends DepBooking {
    pageLocale: string,
    peopleNumber: number
}

export async function fetchBooking (data: FormDataBooking, token: string, dep: DepData) {
    const {email, firstName, lastName, phone, phone_county_code, phone_country_slug, tourName} = data;

    const body = {
        curLang: dep.pageLocale,
        dep_id: dep.depId,
        tour_id: dep.tourId,
        is_civitatis: dep.is_civitatis ? 1 : 0,
        number_people: dep.peopleNumber,
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        phone_county_code: phone_county_code,
        full_time: dep.fullTime ?? '',
        phone_county_slug: phone_country_slug,
        full_number: `${phone_county_code}${phone}`,
        page: 'tour',
        token,
    }


    const results = await fetchBookingDepartures(body);
    try {
        sendEventsGTM({
            eventName: 'add_booking',
            bookID: results.booking_id,
            firstName,
            lastName,
            tourName,
            phoneNumber: phone,
            numberOfPeople: dep.peopleNumber,
        })
    } catch (err) {
        console.log(err)
    }
    return {
        ...results,
        data: {
            tour_id: dep.tourId,
            booking_id: results.booking_id,
            type: dep.is_civitatis ? 'civitatis' : 'oneport',
            customer: toJS(data)
        }
    };
}