import {makeAutoObservable} from "mobx";


export class StoreModalCalendar {
    constructor(storeLoading, storeDepLogic, storeModalBooking, activeLanguage, title) {
        this.loading = storeLoading;
        this.storeDepLogic = storeDepLogic;
        this.activeLanguage = activeLanguage;
        this.title = title;
        this.storeModalBooking = storeModalBooking;
        this.dateList = null;
        this.isOpenedListDeparture = false;
        this.isOpened = false;
        this.date = {
            month: null,
            year: null,
        }
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setDeparturesByDate(date) {
        this.dateList = date;
    }

    get departuresByDate() {
        return this.storeDepLogic.getToursByDay(this.dateList) ?? [];
    }
    openListModal() {
        this.isOpenedListDeparture = true;
    }
    closeListModal() {
        this.isOpenedListDeparture = false;
    }
    get departures() {
        if (this.date.month === null || this.date.year === null) {
            return [];
        }

        const month = this.date.month
        const year = this.date.year
        let dataPrevMonth = month - 1;
        let prevYear = year


        if (month === 1) {
            dataPrevMonth = 12;
            prevYear = prevYear - 1;
        }

        let dataNextMonth = month + 1
        let nextYear = year
        if (month === 12) {
            dataNextMonth = 1;
            nextYear = nextYear + 1;
        }

        return {
            ...this.storeDepLogic.getTourByMonthAndYear(dataPrevMonth, prevYear, this.storeDepLogic.departureIterable),
            ...this.storeDepLogic.getTourByMonthAndYear(month, year),
            ...this.storeDepLogic.getTourByMonthAndYear(dataNextMonth, nextYear),
        }
    }

    changeMonthAndYearn({month, year}) {
        this.date = {
            year,
            month,
        }
    }

    * changeLanguage(locale) {
        this.loading.enableLoading();
        yield this.storeDepLogic.changeLocale(locale);
        this.loading.disableLoading();
        this.setDeparturesByDate(null)

    }

    open() {
        this.isOpened = true;
    }

    close() {
        this.isOpened = false;
    }
}
