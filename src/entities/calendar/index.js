export default class CalendarModel {
    constructor(month = null, year = null, locale = 'en') {
        this._month = month || new Date().getMonth() + 1;
        this._year = year || new Date().getFullYear();
        this.date = new Date();
        this.locale = locale;
        this.startDay = 'Monday';
        this._events = [];
    }

    get month() {
        return this._month - 1;
    }

    set month(month) {
        this._month = month;
    }

    get year() {
        return this._year;
    }

    set year(year) {
        this._year = year;
    }

    setEvents(events) {
        this._events = events;
    }

    nextMonth() {
        if (this._month === 12) {
            this.year = this.year + 1;
            this._month = 1;
        } else {
            this._month = this._month + 1;
        }

        return this.getAllDatsInMonth();
    }

    previusMonth() {
        if (this._month === 1) {
            this.year = this.year - 1;
            this._month = 12;
        } else {
            this._month = this._month - 1;
        }
        return this.getAllDatsInMonth();
    }

    nextYear() {
        this.year = this.year + 1;
        return this.getAllDatsInMonth();
    }

    previusYear() {
        this.year = this.year - 1;
        return this.getAllDatsInMonth();
    }

    getAllDatsInMonth() {
        let listDays = this.getListDateMonth(this.month, this.year);
        listDays = [...this.previusMonthDays(listDays), ...listDays];
        listDays = [...listDays, ...this.nextMonthDays(listDays)]
        return {
            days: listDays,
            month: this.month + 1,
            year: this.year,
            weekdays: Array.from(new Set(listDays.map(item => item.weekday))),
            monthName: new Date(this.year, this.month).toLocaleDateString(this.locale, {month: 'long',})
        }
    }


    isEquilWeekDay({weekday}) {
        return weekday.toLowerCase() === this.startDay.toLowerCase();
    }

    nextMonthDays(listDays) {
        const lastDay = listDays[listDays.length - 1];
        const month = this.month === 11 ? 0 : this.month + 1;
        const year = this.month === 11 ? this.year + 1 : this.year;
        const previusMonth = this.getListDateMonth(month, year);
        const sliceIndex = previusMonth.findIndex(this.isEquilWeekDay.bind(this));
        return previusMonth.slice(0, sliceIndex).map(day => ({...day, nextMonth: true}));

    }

    previusMonthDays(listDays) {
        const [firstDay] = listDays;
        if (firstDay.weekday !== this.startDay) {
            const month = this.month === 0 ? 11 : this.month - 1;
            const year = this.month === 0 ? this.year - 1 : this.year;
            const previusMonth = this.getListDateMonth(month, year);
            const sliceIndex = previusMonth.findLastIndex(this.isEquilWeekDay.bind(this));
            return previusMonth.slice(sliceIndex, previusMonth.length).map(day => ({...day, previusMonth: true}));
        }
        return [];
    }

    getListDateMonth(month = this.month, year = this.year) {
        return Array.from(
            {length: new Date(year, month + 1, 0).getDate()},
            (_, i) => new Date(year, month, i + 1)
        ).map(this.formatDay.bind(this));
    }

    formatDay(day) {
        //const fullDate = day.toLocaleDateString(this.locale , {day:'2-digit' , month:'2-digit' , year:'2-digit'});
        const fullDate = this.getFormatDay(day);
        const formatDay = {
            weekday: day.toLocaleDateString(this.locale, {weekday: 'long'}),
            day: day.toLocaleDateString(this.locale, {day: 'numeric'}),
            fullDate: fullDate,
            payload: this._events.filter(event => event.date === fullDate),
        }

        if (this.currentDay(day)) {
            formatDay.currentDay = true;
        }

        return formatDay;
    }

    currentDay(day) {
        const toLocale = (date) => date.toLocaleDateString(this.local, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return toLocale(new Date()) === toLocale(day);
    }

    getFormatDay(day) {
        const today = new Date(day);
        const yyyy = today.getFullYear().toString()?.substr(-2);
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

}