import {days, locales, months} from "@/i18n/settings";

class I18n {
    locale = null

    constructor(ns, locale) {
        this.ns = ns;
        this.locale = locale;
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]))

    }

    setLocale(locale) {
        this.locale = locale;
    }

    init(locale) {
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]));
        this.locale = locale;
    }

    getDays(locale = this.locale) {
        return Object.fromEntries(days.map(val => [val, this.t(val, locale)]))
    }

    getMonths(locale = this.locale) {
        return Object.fromEntries(months.map(val => [val, this.t(val, locale)]))
    }

    async getFetchDefault(locale = this.locale) {

        if (this.translates[locale] && this.translates[locale][this.ns]) {
            return
        }

        if (this.translates[locale] === undefined) {
            this.translates[locale] = {[this.ns]: {}};
        }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${this.locale}/${this.ns}`,
            {
                next: {
                    revalidate: 60 * 60,
                    tags: ['translates']
                }
            }
        )

        this.translates[locale][this.ns] = await res.json();

    }

    tReplace(key, value, locale = this.locale, ns = this.ns) {
        let label = '';
        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key]) {
            label = key;
        }
        label = this.translates[locale][ns][key] ?? key

        return label.replace('%s', value)
    }

    t(key, locale = this.locale, ns = this.ns) {

        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key]) {
            return key;
        }
        return this.translates[locale][ns][key] ?? key
    }
}

export default I18n