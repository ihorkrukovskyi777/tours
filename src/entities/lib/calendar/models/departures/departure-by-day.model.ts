import {DepBooking} from "@entities/lib/calendar/@types";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {makeAutoObservable} from "mobx";

export interface Day {
    day: string
    disabled: boolean
    fullDate: string
    payload: any[]
    weekday: string
}
export class DepartureByDayModel {
    deps: DepBooking[] = []
    constructor(readonly model: DeparturesModel) {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setToursByDay(day: Day) {
        this.deps = Object.values(this.model.getToursByDay(day.fullDate)).flat() as DepBooking[]
    }

}