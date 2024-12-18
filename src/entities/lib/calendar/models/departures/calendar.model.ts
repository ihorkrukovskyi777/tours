import {makeAutoObservable, observable} from "mobx";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {DepBooking} from "@entities/lib/calendar/@types";

export type DeparturesByDate = {[key in string]: DepBooking}

const getYear = () => {
    return new Date().getFullYear()
}
const getMonth = () => {
    return new Date().getMonth() + 1

}
export class CalendarModel {
    date: { year: number | null, month: number | null} = { month: getMonth(), year: getYear()}
    departures: DeparturesByDate = {}
    constructor(readonly model: DeparturesModel) {
        makeAutoObservable(this, {departures: observable.shallow}, {autoBind: true})
    }

    changeMonthAndYearn({ year, month}: { year: number, month: number}) {


        if(this.date.year !== year || this.date.month !== month) {
            this.date = { year, month}
            this.updateDepartures()
        }

    }
    updateDepartures() {
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
        const storeDepLogic = this.model

        this.departures = {
            ...storeDepLogic.getTourByMonthAndYear(dataPrevMonth, prevYear),
            ...storeDepLogic.getTourByMonthAndYear(month, year),
            ...storeDepLogic.getTourByMonthAndYear(dataNextMonth, nextYear),
        }

    }
}