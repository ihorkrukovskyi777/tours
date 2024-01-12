export class ServiceDate {
    constructor(date) {
        this.date =  new Date(date);
        this.MONTH = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]

        this.WEEK_DAYS = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]

    }
    get isToday() {
        const today = new Date();
        return today.getFullYear() === this.date.getFullYear() &&
            today.getMonth() === this.date.getMonth() &&
            today.getDate() === this.date.getDate();
    }

    get isTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toDateString() === this.date.toDateString()
    }
    get month() {
        return this.MONTH[this.date.getMonth()]
    }

    get day() {
        if(this.isToday) {
            return 'Today';
        }
        else if(this.isTomorrow) {
            return 'Tomorrow';
        }
        return this.WEEK_DAYS[this.date.getDay()]
    }

    get dayNum() {
        return this.date.getDate();
    }

}
