import { makeAutoObservable } from "mobx"
import { fromPromise } from 'mobx-utils'
import {getCountryPhone} from "@/entities/api";


export class StorePhone {
    constructor(locale, phones = []) {
        console.log('phones init')
        this.locale = locale;
        this.phones = {
            state: 'succeed',
            value: phones,
        };
        makeAutoObservable(this, {}, { autoBind: true });
    }
     fetchPhones(){
        this.phones = fromPromise(getCountryPhone(this.locale))
     }

}
