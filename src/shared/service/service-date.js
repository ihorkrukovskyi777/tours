import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);
dayjs.extend(timezone);
export class ServiceDate {
    constructor(date, fullNameDayWeek = true) {
        this.date = new Date(date);
        this.fullNameDayWeek = fullNameDayWeek
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
        if (this.isToday && this.fullNameDayWeek) {
            return 'Today';
        } else if (this.isTomorrow && this.fullNameDayWeek) {
            return 'Tomorrow';
        }
        return this.WEEK_DAYS[this.date.getDay()]
    }

    get dayNum() {
        return this.date.getDate();
    }

    get time() {
        const time = this.date


        return dayjs.utc(time).format("HH:mm")
    }

    get differenceInDays() {

        const date1 = this.date;
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    get monthNum() {
        return this.date.getMonth()+1;
    }

    get yearNum() {
        return this.date.getFullYear();
    }
    get yearYY() {
        return `${this.yearNum}`.replace('20', '')
    }

}
