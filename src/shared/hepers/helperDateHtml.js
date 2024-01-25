import { ServiceDate } from "../service/service-date";

export class HelperDateHtml extends ServiceDate {

    constructor(date){
        super(date);
    }

    get ddmmyear() {
        return `
               ${this.dayNum}/
               ${this.monthNum}/
               ${this.yearNum}
            `;
    }

    dayDeparture(t) {
        return `
               ${t(this.day)},
                ${this.dayNum}
               ${t(this.month)}
            `;
    }
}
