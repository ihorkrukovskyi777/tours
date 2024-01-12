import { makeAutoObservable } from "mobx";

export class StoreLoading {
    constructor(loading = false) {
        this.isLoad = loading;
        makeAutoObservable(this)
    }

    enableLoading() {
        this.isLoad = true;
    }
    disableLoading() {
        this.isLoad = false;
    }
}
