import {makeAutoObservable} from "mobx"
import TourLogic from "@/entities/calendar/service/tour-logic";
import {isTomorrowOrToday} from "@/shared/hepers/date";


export class StoreTourLogic {
    constructor(locale, type, id) {
        this._allDepartures = [];
        this.departureIterable = null;
        this.offset = 0;
        this.done = false;
        this.people = 1;
        this.isEmpty = true;
        this.activeLanguage = [];
        this.timezone = 'UTC';
        this.locale = locale;
        this.service = new TourLogic(id, locale, locale, type);
        makeAutoObservable(this, {}, {autoBind: true, deep: false});

    }

    get isNextPage() {
        return this._allDepartures.length > this.departures.length
    }

    getToursByDay(date) {

        const values = this.service.getToursByDay(date);

        for (const key in values) {

            values[key] = values[key].map(dep => {
                const subVendor = this.getSubVendor(dep.subVendorId)
                return {
                    ...dep,
                    tourTitle: this.getTourTitle(dep.tourId),
                    avatar: subVendor.avatar,
                    subVendorName: subVendor.name,
                    ranking: subVendor.ranking,
                }
            })
        }
        return values
    }
    getTourByMonthAndYear(month, year) {
        return this.service.getTourByMonthAndYear(month, year);
    }

    findById(id) {
        const find = this._allDepartures.find(dep => dep.depId === id);
        const dateLabel = this.getNamesDays()[find.date] ?? ''
        return {
            ...find,
            dateLabel,
            people: this.people,
        }
    }

    get flagUrl() {
        const find = this.activeLanguage.find(({code}) => code === this.locale)
        return find?.country_flag_url ?? null;
    }

    * changeLocale(locale) {
        this.locale = locale;
        this.setPeople(1);
        this.service.updateCurrentLang(locale);
        yield this.fetchDepartures();
    }

    initPagination() {
        this.done = false;
        this.offset = 0;
        this._allDepartures = [];
        this.departureIterable = this.service.getDataMonth();
        this.nextPage();

    }

    setPeople(people) {
        this.people = people;
        this.service.updatePeopleNumber(this.people);
    }

    changePeople(people) {
        this.setPeople(people)
        this.initPagination();

    }

    * fetchDepartures() {
        yield this.service.getData((timezone) => {
            this.timezone = timezone;
        });
        this.isEmpty = !Object.keys(this.service.data[this.locale].deps).length
        this.initPagination();
    }

    getNamesDays() {
        return this.service.getDaysNameByLocale(this.locale)
    }
    getDaysNameByLocaleAndDate(day) {
        return this.service.getDaysNameByLocaleAndDate(this.locale, day);
    }

    get departures() {
        return this._allDepartures.slice(0, this.offset);
    }

    getSubVendor(id) {
        return this.service?.data[this.locale]?.subVendor[id] ?? {};
    }

    getTourTitle(id) {
        return this.service?.data[this.locale]?.tours[id] ?? '';
    }

    nextPage() {
        if (this.offset + 20 < this._allDepartures.length && this.offset > 0 || this.done) {
            this.offset = this.offset + 10;
        } else {
            const results = [];
            while (true) {
                const data = this.departureIterable.next()
                this.done = data.done;

                results.push(...Object.values(data.value).flat())
                if (data.done || results.length > 30) {
                    break;
                }
            }
            const additionalField = results.map(item => {
                const subVendor = this.getSubVendor(item.subVendorId)
                return {
                    ...item,
                    tourTitle: this.getTourTitle(item.tourId),
                    avatar: subVendor.avatar,
                    subVendorName: subVendor.name,
                    ranking: subVendor.rating,
                }
            })
            this._allDepartures = [...this._allDepartures, ...additionalField];

            let spliceIndex = 10;
            if (this.departures.length === 0) {
                const findIndex = this._allDepartures.findIndex(item => {
                    if (isTomorrowOrToday(item.date, 0)) {
                        return false
                    } else if (isTomorrowOrToday(item.date, 1)) {
                        return false;
                    }
                    return true;
                })
                spliceIndex = findIndex < 5 ? 5 : findIndex;
                spliceIndex = spliceIndex > 30 ? 30 : spliceIndex;
            }
            this.offset = this.offset + spliceIndex;
        }


    }
}
