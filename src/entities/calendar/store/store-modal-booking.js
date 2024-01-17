import {makeAutoObservable} from "mobx";

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
