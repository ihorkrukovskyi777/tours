import {makeAutoObservable} from "mobx";
import { searchCities } from "@/entities/api";

export class StoreSearchCity {
    constructor(locale) {
        this.search = '';
        this.locale = locale;
        this.cities = [];
        makeAutoObservable(this);
    }


    * getFetchCities() {
        this.cities = yield searchCities(this.locale , this.search);
        console.log(this.cities);
    }


    setSearch (value) {
        this.search = value;
    }

}
