import {makeAutoObservable} from "mobx";
import {fromPromise} from "mobx-utils";
import {getCountryPhone} from "@/shared/api/getCountryPhone";

export class StoreModalBooking {
    constructor() {
        this.isOpened = false;
        this.departure = null;
        makeAutoObservable(this, {}, { autoBind: true });
    }
    setDeparture(dep) {
        this.departure = dep;
    }
    open() {
        this.isOpened = true;
    }
    close() {
        this.isOpened = false
    }
}
