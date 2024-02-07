import {days, genitiveNS, locales, months} from "@/i18n/settings";

class I18nGenitive {
    locale = null

    constructor() {
        this.translates = Object.fromEntries(locales.map(locale => [locale, {}]))

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
        if (this.translates[this.locale] && this.translates[this.locale][genitiveNS]) {
            return
        }

        if (this.translates[this.locale] === undefined) {
            this.translates[this.locale] = {defaultNS: {}};
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/file-translates/${this.locale}/${genitiveNS}`, {next: {revalidate: 60 * 5}})

        this.translates[this.locale][genitiveNS] = await res.json();
    }

    t(key, locale = this.locale, ns = genitiveNS) {

        if (!this.translates[locale] || !this.translates[locale][ns] || !this.translates[locale][ns][key]) {
            return key;
        }
        return this.translates[locale][ns][key] ?? key
    }
}

export default new I18nGenitive();