import { makeAutoObservable, onBecomeObserved } from "mobx"
import { fromPromise } from 'mobx-utils'
import {getCountryPhone} from "@/shared/api/getCountryPhone";


export class StorePhone {
    constructor(locale) {
        this.locale = locale;
        this.phones = [];
        makeAutoObservable(this, {}, { autoBind: true });
    }
     fetchPhones(){
        this.phones = fromPromise(getCountryPhone(this.locale))
     }

}
