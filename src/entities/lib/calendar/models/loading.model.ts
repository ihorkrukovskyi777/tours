import {makeAutoObservable} from "mobx";
type Loading = 'main' | 'fetch-booking' | 'additional' | 'additional-booking'
export class LoadingModel {

    private loading: Loading[] = ['main']
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    set(val: Loading) {
        const find = this.loading.find(v => v === val);
        if(!find) {
            this.loading.push(val)
        }
    }
    turnOff(val: Loading) {
        this.loading = this.loading.filter(v => v !== val)
    }
    get isMainLoading() {
        return !!this.loading.find(val => val === 'main')
    }

    get isBookingLoading() {
        return !!this.loading.find(val => val === 'fetch-booking')
    }

    get isAdditionalBooking() {
        return !!this.loading.find(val => val === 'additional-booking')
    }
}