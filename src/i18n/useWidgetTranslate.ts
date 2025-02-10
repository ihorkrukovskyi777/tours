import {Ii18n} from "@/bokun-widget/src/common/i18n.type";
export default async function  useWidgetTranslate(locale: string) : Promise<Ii18n> {

    const translates = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/influencer?locale=${locale}`)
    const i18n = await translates.json();

    const getErrorMessage = (key: string) => i18n.bokunWidget.errorMessage[key]
    const t = (key: string) => i18n.bokunWidget[key]
    const m = (key: string) => i18n.months[key]
    const dayShort = (key: string) => i18n.daysShort[key]
    const dayShortDDD = (key: string) => i18n.daysShortDDD[key]
    return {
        fees: t('fees'),
        errorMessage: {
            fieldIsRequired: getErrorMessage('fieldIsRequired'),
            invalidDate: getErrorMessage('invalidDate'),
            onlyNumber:  getErrorMessage('onlyNumber'),
            spaceAreNotAllowed: getErrorMessage('spaceAreNotAllowed'),
            invalidPhoneNumber: getErrorMessage('invalidPhoneNumber')
        },
        orderSummary: t('orderSummary'),
        yes: t('yes'),
        back:  t('back'),
        no: t('no'),
        pay: t('pay'),
        price: t('price'),
        at: t('at'),
        tax: t('tax'),
        update: t('update'),
        duration: t('duration'),
        discount: t('discount'),
        contact_details: t('contact_details'),
        required: t('required'),
        checkout: t('checkout'),
        i_accept_cancellation_policy: t('i_accept_cancellation_policy'),
        selectTravellersForThisExtra: t('selectTravellersForThisExtra'),
        per: t('per'),
        travelRequiredToBookThisExtra: t('travelRequiredToBookThisExtra'),
        travellers: t('travellers'),
        includedInPrice: t('includedInPrice'),
        NON_REFUNDABLE: t('NON_REFUNDABLE'),
        FULL_REFUND: t('FULL_REFUND'),
        ADVANCED: t('ADVANCED'),
        secureCheckout: t('secureCheckout'),
        youAreBooking: t('youAreBooking'),
        departure: t('departure'),
        backToCalendar: t('backToCalendar'),
        items: t('items'),
        item: t('item'),
        estimatedTimeOfArrival:t('estimatedTimeOfArrival'),
        roomNumber: t('roomNumber'),
        whichAirline: t('whichAirline'),
        whichTerminal: t('whichTerminal'),
        whereShouldWePickup: t('whereShouldWePickup'),
        whereShouldWeDropoff: t('whereShouldWeDropoff'),
        chooseTime: t('chooseTime'),
        addToYouExperience: t('addToYouExperience'),
        buttonCheckout: t('buttonCheckout'),
        showMore: t('showMore'),
        traveller : t('traveller'),
        showLess: t('showLess'),
        chooseADate: t('chooseADate'),
        flightNumber: t('flightNumber'),
        bookingQuestions: t('bookingQuestions'),
        mainTravellerContactDetails: t('mainTravellerContactDetails'),
        pickUpMandatoryAdditionalCost: t('pickUpMandatoryAdditionalCost'),
        pickUpAvailableIncludePrice: t('pickUpAvailableIncludePrice'),
        pickUpAvailable: t('pickUpAvailable'),
        dropoffAvailable: t('dropoffAvailable'),
        completeYouBooking: t('completeYouBooking'),
        dropoffMandatoryAdditionalCost: t('dropoffMandatoryAdditionalCost'),
        dropoffAvailableIncludePrice: t('dropoffAvailableIncludePrice'),
        requiresAtLeastParticipants: t('requiresAtLeastParticipants'),
        canBeBookedForUpToBooking: t('canBeBookedForUpToBooking'),
        pleaseSelectFromAbove: t('pleaseSelectFromAbove'),
        participants: t('participants'),
        priceNotFound: t('priceNotFound'),
        cancellationPolicy: t('cancellationPolicy'),
        departureNotAvailable: t('departureNotAvailable'),
        age: t('age'),
        youNeedToSelectMinimum: t('youNeedToSelectMinimum'),
        yourSelectionIsNotAvailableMonth: t('yourSelectionIsNotAvailableMonth'),
        showingPricesInCurrencyLabel: t('showingPricesInCurrencyLabel'),
        bookingSummaryTitle: t('bookingSummaryTitle'),
        continue: t('continue'),
        total: t('total'),
        choiceRates: t('choiceRates'),
        months: {
            "January": m('January'),
            "February": m('February'),
            "March": m('March'),
            "April": m('April'),
            "May": m('May'),
            "June": m('June'),
            "July": m('July'),
            "August": m('August'),
            "September": m('September'),
            "October": m('October'),
            "November": m('November'),
            "December": m('December')
        },
        daysShort: {
            "Su": dayShort('Su'),
            "Mo": dayShort('Mo'),
            "Tu": dayShort('Tu'),
            "We": dayShort('We'),
            "Th": dayShort('Th'),
            "Fr": dayShort('Fr'),
            "Sa": dayShort('Sa')
        },
        daysShortDDD: {
            "Sun": dayShortDDD('Sun'),
            "Mon": dayShortDDD('Mon'),
            "Tue": dayShortDDD('Tue'),
            "Wed": dayShortDDD('Wed'),
            "Thu": dayShortDDD('Thu'),
            "Fri": dayShortDDD('Fri'),
            "Sat": dayShortDDD('Sat')
        }

    }
}