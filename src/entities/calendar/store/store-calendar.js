import {makeAutoObservable, onBecomeObserved} from "mobx"
import {StoreLoading} from "@/entities/calendar/store/store-loading";
import {StoreTourLogic} from "@/entities/calendar/store/store-tour-logic";
import {StoreModalBooking} from "@/entities/calendar/store/store-modal-booking";
import {StoreModalCalendar} from "@/entities/calendar/store/store-modal-calendar";
export class StoreCalendar {
    constructor(locale, type, id, activeLanguage) {
        this.type = type;
        this.id = id;
        this.activeLanguage = activeLanguage;
        this.storeModalBooking = new StoreModalBooking()
        this.storeDepLogic = new StoreTourLogic(locale, type, id)
        this.loading = new StoreLoading(true);
        this.storeModalCalendar = new StoreModalCalendar(this.loading, this.storeDepLogic, this.storeModalBooking, this.activeLanguage)
        makeAutoObservable(this, {}, {autoBind: true, deep: false});
    }

    get locale() {
        return this.storeDepLogic.locale
    }
    * changeLanguage(locale) {
        this.loading.enableLoading();
        yield this.storeDepLogic.changeLocale(locale);
        this.loading.disableLoading();

    }
    selectedBooking(dep) {
        this.storeModalBooking.setDeparture(dep);
        this.storeModalBooking.open()
    }
    * fetchDepartures() {
        try {
            this.loading.enableLoading();
            yield this.storeDepLogic.fetchDepartures();
            this.loading.disableLoading();
        } catch (err) {
            console.log(err)
        }
    }

    get departures() {
        return this.storeDepLogic.departures;
    }


}
