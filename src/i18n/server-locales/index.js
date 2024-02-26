import {days, defaultNS, fallbackLng, locales, months} from "@/i18n/settings";

class I18n {
    locale = null

    constructor() {
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]))

    }

    getMapSliders() {
        return {
            tour_features: this.t('Tour Features'),
            book_now: this.t('Book now'),
            hours: this.t('Hours'),
            tickets: this.t('Tickets'),
            from: this.t('from'),
            duration: this.t('Duration'),
            clear: this.t('Clear'),
            tour: this.t('Tour')
        }
    }

    getFormErrors() {
        return {
            first_name_max_length_is_50_symbols: this.t('first_name_max_length_is_50_symbols'),
            first_name_should_be_without_numbers: this.t('first_name_should_be_without_numbers'),
            last_name_max_length_is_50_symbols: this.t('last_name_error'),
            last_name_should_be_without_numbers: this.t('last_name_should_be_without_numbers'),
            email_error: this.t('email_error'),
            phone_number_error: this.t('phone_number_error'),
            field_is_required: this.t('This field is required'),
        }
    }

    init(locale) {
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]));
        this.locale = locale;
    }

    getDays() {
        return Object.fromEntries(days.map(val => [val, this.t(val)]))
    }

    getMonths() {
        return Object.fromEntries(months.map(val => [val, this.t(val)]))
    }

    async getFetchDefault() {
        if (this.translates[this.locale] && this.translates[this.locale][defaultNS]) {
            return
        }

        if (this.translates[this.locale] === undefined) {
            this.translates[this.locale] = {defaultNS: {}};
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${this.locale}/${defaultNS}`, {next: {revalidate: 60 * 5}})

        this.translates[this.locale][defaultNS] = await res.json();

    }
    tReplace(key, value, locale = this.locale, ns = defaultNS) {
        let label = '';
        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key]) {
            label = key;
        }
        label = this.translates[locale][ns][key] ?? key

        return label.replace('%s', value)
    }

    t(key, locale = this.locale, ns = defaultNS) {

        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key]) {
            return key;
        }
        return this.translates[locale][ns][key] ?? key
    }
}

export default new I18n();