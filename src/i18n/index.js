import {days, defaultNS, fallbackLng, locales, months} from "@/i18n/settings";

class I18n {
    locale = null

    constructor() {
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]))

    }

    getMapSliders() {
        return {
            our_features: this.t('Tour Features'),
            book_now: this.t('Book now'),
            hours: this.t('Hours'),
            tickets: this.t('Tickets'),
            from: this.t('from'),
            duration: this.t('Duration'),
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

    async getFetch(ns = defaultNS) {
        if(this.translates[this.locale] && this.translates[this.locale][ns]) {
            return
        }

        const start = new Date().getTime();
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${this.locale}/${ns}`, {next: {revalidate: 60 * 60}})
        this.translates[this.locale] = {[defaultNS]: {}}
        this.translates[this.locale][ns] = await res.json();
    }

    t(key, locale = this.locale, ns = defaultNS) {

        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key] || locale === fallbackLng) {
            return key;
        }
        return this.translates[locale][ns][key]
    }
}

export default new I18n();