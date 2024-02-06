import { makeAutoObservable } from "mobx"
import {getCountryPhone} from "@/entities/api";
import country from "@/lib/react-phone/raw-country";



export class StorePhone {
    constructor(locale) {
        this.locale = locale;

        this.phones = {
            state: '',
            value: []
        };
        makeAutoObservable(this, {}, { autoBind: true });
    }
    * changeLocale(locale) {
        this.locale = locale;
        yield this.fetchPhones()
    }
     * fetchPhones(){
       const phones = yield getCountryPhone(this.locale);

         if(typeof window !== "undefined") {
             if(Array.isArray(window.rawCountry)) return
             const listCountry = {...country}
             phones.forEach(item => {
                 if(listCountry[item.code] && item.phone_code) {
                     listCountry[item.code][3] = item.phone_code
                 }
             })

            window.rawCountry = Object.values(listCountry)
         }


       this.phones = {
           state: 'fulfilled',
           value: phones,
       }
     }

}
