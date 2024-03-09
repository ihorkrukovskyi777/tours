import { ServiceDate } from "../service/service-date";

export class HelperDateHtml extends ServiceDate {

    constructor(date, fullNameDayWeek = true){
        super(date, fullNameDayWeek);
    }

    get ddmmyear() {
        return `
               ${this.dayNum}/
               ${this.monthNum}/
               ${this.yearNum}
            `;
    }

    dayDeparture(days = {}, months = {}) {

        return `
               ${days[this.day] ?? this.day},
                ${this.dayNum}
               ${months[(this.month)] ?? this.month}
            `;
    }
    dayDepartureFullTime(days = {}, months = {}) {
        return `
               ${days[this.day]},
                ${this.dayNum}
               ${months[this.month]},
               ${this.time}
            `;
    }
}
