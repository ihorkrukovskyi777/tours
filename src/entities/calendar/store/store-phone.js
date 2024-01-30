import { makeAutoObservable } from "mobx"
import { fromPromise } from 'mobx-utils'
import {getCountryPhone} from "@/entities/api";


export class StorePhone {
    constructor(locale) {
        this.locale = locale;
        this.phones = [];
        makeAutoObservable(this, {}, { autoBind: true });
    }
    * changeLocale(locale) {
        this.locale = locale;
        yield this.fetchPhones()
    }
     fetchPhones(){
        this.phones = fromPromise(getCountryPhone(this.locale))
     }

}
