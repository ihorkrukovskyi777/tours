export function sendEventsGTM({eventName, bookID, firstName, lastName, tourName, phoneNumber, numberOfPeople}) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        event: eventName,
        booking_id: bookID,
        first_name: firstName,
        last_name: lastName,
        tour: tourName,
        phone_number: phoneNumber,
        number_of_people: numberOfPeople
    });
}