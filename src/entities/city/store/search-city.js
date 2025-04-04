import {makeAutoObservable} from "mobx";
import { searchCities } from "@/entities/api";

export class StoreSearchCity {
    isEmpty = false;
    constructor(locale) {
        this.search = '';
        this.locale = locale;
        this.cities = [];
        makeAutoObservable(this);
    }


    * getFetchCities() {
        this.cities = yield searchCities(this.locale , this.search);
        if(this.cities.length === 0 && this.search?.trim()?.length) {
            this.isEmpty = true
        }
    }


    setSearch (value) {
        this.search = value;
        this.isEmpty = false
    }

}
