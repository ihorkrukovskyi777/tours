import 'server-only'
import I18n from "@/i18n/service/i18n";
import { defaultNS, } from "@/i18n/settings";
import {cache} from "react";

const serverContext = cache((locale) => {
    return new I18nDefault(defaultNS, locale);
})
export default async function useDefaultI18n(locale) {
    const i18n = serverContext(locale);
    await i18n.getFetchDefault(locale);
    return {
        t: (key) => i18n.t(key, locale),
        tReplace: (key, value, locale) => i18n.tReplace(key, value, locale),
        getMapSliders: () => i18n.getMapSliders(locale),
        getFormErrors: () => i18n.getFormErrors(locale),
        getDays: i18n.getDays,
        getMonths: i18n.getMonths,
    };
}



class I18nDefault extends I18n {
    constructor(ns, locale) {
        super(ns, locale);
    }
    getMapSliders(locale) {
        return {
            tour_features: this.t('Tour Features', locale),
            book_now: this.t('Book now', locale),
            hours: this.t('Hours', locale),
            tickets: this.t('Tickets', locale),
            from: this.t('from', locale),
            duration: this.t('Duration', locale),
            clear: this.t('Clear', locale),
            tour: this.t('Tour', locale),
            tours: this.t('Tours', locale),
            use_ctrl: this.t('Use ctrl + scroll to zoom the map', locale),
            read_more: this.t('Read More', locale),
            activities_nearby: this.t('Activities nearby', locale),
        }
    }
    getFormErrors(locale) {
        return {
            first_name_max_length_is_50_symbols: this.t('first_name_max_length_is_50_symbols', locale),
            first_name_should_be_without_numbers: this.t('first_name_should_be_without_numbers', locale),
            last_name_max_length_is_50_symbols: this.t('last_name_error', locale),
            last_name_should_be_without_numbers: this.t('last_name_should_be_without_numbers', locale),
            email_error: this.t('email_error', locale),
            phone_number_error: this.t('phone_number_error', locale),
            field_is_required: this.t('This field is required', locale),
        }
    }
}

