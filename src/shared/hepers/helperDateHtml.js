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
}