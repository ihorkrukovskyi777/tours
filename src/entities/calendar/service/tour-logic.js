import {fetchDepartures} from "@/entities/calendar/api";

const getTimePeriod = (day, elem) => {
    return day.subVendorId === elem?.subVendorId ? 15 : 30;
}
const ORDER_SORT = ['en', 'es', 'pt-pt', 'fr', 'de', 'it', 'cat', 'ru', 'pl', 'nl', 'ar'];

const isAddTourFirstElem = (day, elemTime, period) => elemTime.time - day.time >= period
const isAddTourLastElem = (day, elemTime, period) => day.time - elemTime.time >= period

const isAddTourPrevELemAndNext = (day, prevElem, nextElem, periodPrev, periodNext) => {
    return day.time - prevElem.time >= periodPrev && nextElem.time - day.time >= periodNext;
}

function addTourDay(day, toursDays) {


    if (toursDays.length === 0) {
        toursDays.push(day);
        return toursDays;
    }
    const length = toursDays.length;
    for (let i = 0; i < length; i++) {

        const isLastElement = i === length - 1;
        if (isAddTourFirstElem(day, toursDays[0], getTimePeriod(day, toursDays[0]))) {
            toursDays.push(day);
            break;
        } else if (isLastElement) {
            const lastTour = toursDays[length - 1];
            const isAddTour = isAddTourLastElem(
                day,
                toursDays[length - 1],
                getTimePeriod(day, lastTour)
            );
            if (isAddTour) {
                toursDays.push(day);
                break;
            }
        } else if (!isLastElement) {
            const prevTour = toursDays[i];
            const nextTour = toursDays[i + 1];
            const isAddTour = isAddTourPrevELemAndNext(
                day,
                prevTour,
                nextTour,
                getTimePeriod(day, prevTour),
                getTimePeriod(day, nextTour),
            );
            if (isAddTour) {

                toursDays.push(day);
                break;
            }
        }
    }

    return toursDays.sort(((a, b) => a.time - b.time));

}

export default class TourLogic {
    constructor(id, locale, translate, type, hydration) {
        this.type = type;
        this.id = id;
        this.cache = {};
        this.currentLang = locale;
        this.data = {[locale]: hydration?.deps};
        this.peopleNubmer = 1;
        this.date = {
            year: new Date().getFullYear(),
            month: null,
        }

    }


    updatePeopleNumber(number = 1) {
        this.peopleNubmer = number;
    }

    getTourTitlePost(id) {
        return this.data[this.currentLang].tours[id]
    }

    getSubVendor(id) {
        return this.data[this.currentLang].subVendor[id]
    }

    getLabelDate(date) {
        return this.data[this.currentLang].days[date];
    }

    get getDaysName() {
        return this.data[this.currentLang].days
    }

    getFormatDay(day) {
        const today = new Date(day);
        const yyyy = today.getFullYear().toString().substr(-2);
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }

    getToursByDay(day) {

        return this.filterDays({...this.data[this.currentLang]?.deps || {}}, [day]);
    }

    filterUserRating(usersRating) {
        let lists = Object.keys(usersRating).map(key => usersRating[key]).flat();
        lists = lists.sort((a, b) => {
            if ((a.ranking - b.ranking) !== 0) {
                return a.ranking - b.ranking
            }
            return (a.created_at - b.created_at) * -1;
        }).reverse().filter(item => {
            return item.maxPerBooking >= this.peopleNubmer;
        })

        const toursDays = [];
        lists.forEach(item => addTourDay(item, toursDays));
        return toursDays;

    }


    getAllDaysMonth(month, year) {

        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }


        return days.map(day => this.getFormatDay(day))
    }

    updateCurrentLang(lang) {
        this.currentLang = lang;

    }
        getDaysNameByLocale(lang) {
        return this.data[lang]?.days ?? {}
    }
    getDaysNameByLocaleAndDate(lang, day) {
        return this.data[lang]?.days[day] ?? ''
    }

    async getData(callback) {

        if(this.data[this.currentLang]) {
            callback('UTC')
        }
        if (this._fetch) return this._fetch;
        this._fetch = new Promise(async (res) => {

            const { timezone, deps } = await fetchDepartures(this.id, this.type, this.currentLang);
            this.data[this.currentLang] = deps;

            res(timezone);
            this._fetch = null;

        });
        return this._fetch;
    }

    getTourByMonthAndYear(month, year) {

        if (!this.data[this.currentLang]) {
            return []
        }
        const key = `${this.peopleNubmer}-${month}-${year}`;
        if (this[key]) {
            return this[key]
        }
        const days = this.getAllDaysMonth(month - 1, year);
        const data = this.filterDays({...this.data[this.currentLang].deps}, days);

        this.cache[key] = data;
        return data
    }

    filterDays(deps, days) {
        const start =new Date().getTime();
        const list = {};

        for (let i = 0; i < days.length; i++) {
            if (deps[days[i]]) {
                list[days[i]] = [];
                for (const key in deps[days[i]]) {
                    const dep = deps[days[i]][key];
                    const depFilter = this.filterUserRating(dep);
                    if (depFilter.length) {
                        list[days[i]].push(...depFilter);
                    }
                }
                const newDepFilter = [];
                const depsList = list[days[i]];
                let prevItem = null;
                let nextItem = null;
                for (let i = 0; i < depsList.length; i++) {
                    const item = depsList[i];
                    if (!item.is_civitatis) {
                        newDepFilter.push(item);
                        continue;
                    }
                    prevItem = depsList.slice(0, i).reverse().find(item => !item.is_civitatis);
                    nextItem = depsList.slice(i).find(item => !item.is_civitatis);

                    const timePeriod = 179;

                    const prevTime = prevItem?.time;
                    const nextTime = nextItem?.time;

                    const isFirstFlag = (prevItem === undefined || prevItem?.tourId !== item.tourId) || (item.time - prevTime) > timePeriod;
                    const isSecondFlag = (nextTime === undefined || nextTime?.tourId !== item.tourId) || (nextTime - item.time) > timePeriod;

                    if (isFirstFlag && isSecondFlag) {
                        newDepFilter.push(item);
                    }
                }
                list[days[i]] = newDepFilter;
            }
            delete deps[days[i]]
        }
        this.sortTimeTours(list)

        return list;
    }

    sortTimeTours(tours) {
        for (const key in tours) {
            tours[key].sort((a, b) => a.time - b.time)
        }
    }

    * getDataMonth() {
        let month = new Date().getMonth();
        let year = new Date().getFullYear().toString().substr(-2);
        const deps = {...this.data[this.currentLang].deps};
        while (true) {
            if (Object.keys(deps).length === 0) return false;
            const days = this.getAllDaysMonth(month, year);
            const list = this.filterDays(deps, days);

            month++;
            if (month === 12) {
                month = 0;
                year++;
            }

            yield list;
        }

    }
}
