import { ServiceDate } from "../service/service-date";

export class HelperDateHtml extends ServiceDate {

    constructor(date, fullNameDayWeek = true){
        super(date, fullNameDayWeek);
    }

    get ddMmYYYY() {
        const day = this.dayNum < 10 ? `0${this.dayNum}`: this.dayNum;
        const monthNum = this.monthNum < 10 ? `0${this.monthNum}`: this.monthNum;
        return `${day}/${monthNum}/${this.yearNum}`;
    }
    get ddMmYy() {
        const day = this.dayNum < 10 ? `0${this.dayNum}`: this.dayNum;
        const monthNum = this.monthNum < 10 ? `0${this.monthNum}`: this.monthNum;
        return `${day}/${monthNum}/${this.yearYY}`;
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
