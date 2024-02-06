import {makeAutoObservable} from "mobx"
import {getCountryPhone} from "@/entities/api";

export class StorePhone {
    constructor(locale) {
        this.locale = locale;

        this.phones = {
            state: '',
            value: []
        };
        makeAutoObservable(this, {}, {autoBind: true});
    }

    * changeLocale(locale) {
        this.locale = locale;
        yield this.fetchPhones()
    }

    * fetchPhones() {
        const phones = yield getCountryPhone(this.locale);
        this.phones = {
            state: 'fulfilled',
            value: phones,
        }
    }

}
