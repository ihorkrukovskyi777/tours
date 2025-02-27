import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {defaultNS} from "@i18n/settings";

export default getRequestConfig(async ({requestLocale}) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;
    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as never)) {
        locale = routing.defaultLocale;
    }


    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${locale === 'en' ? 'es' : locale}/${defaultNS}`, {
        next: {
            revalidate: 0
        }
    });


    const responseVouched = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/influencer?locale=${locale}`, {
        next: {
            revalidate: 0
        }
    });
    const translates = await response.json()
    const translatesVouched = await responseVouched.json()
    const cancellation = (await import(`../../messages/${locale}.json`)).default;


    const getTranslates = () => {
        if(locale !== 'en') {
            return translates
        }

        const messages: {[key in string] : string} = {};

        Object.keys(translates).forEach(key => {
            messages[key] = key
        })
        return messages;
    }
    const messages = getTranslates();

    const getMessage = (key: string) => {
        if(messages[key]) return messages[key]
        return key;
    }
    return {
        locale,
        messages: {
            ...translatesVouched,
            fees: 'fees',
            ...cancellation,
            'off!': getMessage('off!'),
            'Paid Tours in {city}': getMessage('Paid Tours in {city}'),
            days: translatesVouched.days,
            hours: translatesVouched.hours,
            months: translatesVouched.months,
            daysFull: translatesVouched.daysFull,
            similarExperiences: translatesVouched.similarExperiences ?? 'Similar Experiences',
            from: translatesVouched.from,
            language: translatesVouched.language,
            pleaseNote: translatesVouched.pleaseNote,
            and: translatesVouched.and,
            whatDoINeedToBring: translatesVouched.whatDoINeedToBring,
            description: translatesVouched.description,
            whatIsIncluded: translatesVouched.whatIsIncluded,
            exclusions: translatesVouched.exclusions,
            pickUp: translatesVouched.pickUp,
            meetingPoints: translatesVouched.meetingPoints,
            cancellationPolicy: translatesVouched.cancellationPolicy,
            itinerary: translatesVouched.itinerary,
            weOfferPickupNotice: translatesVouched.weOfferPickupNotice,
            youCanStarPickup: translatesVouched.youCanStarPickup,
            showLocation: translatesVouched.showLocation,
            'drop-off': translatesVouched.dropOff,
            pickup: translatesVouched.pickup,

            // ...translates
        }
    };
});