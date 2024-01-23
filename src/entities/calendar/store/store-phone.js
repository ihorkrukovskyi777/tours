import { makeAutoObservable } from "mobx"
import { fromPromise } from 'mobx-utils'
import {getCountryPhone} from "@/entities/api";


export class StorePhone {
    constructor(locale, phones) {
        this.locale = locale;
        this.phones = {
            state: 'success',
            value: phones,
        };
        makeAutoObservable(this, {}, { autoBind: true });
    }
     fetchPhones(){
        this.phones = fromPromise(getCountryPhone(this.locale))
     }

}
