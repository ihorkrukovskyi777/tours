import mergeDeep from "@/shared/util/merge-deep";
const getTimePeriod = (day, elem) => {
    return day.subVendorId === elem?.subVendorId ? 15 : 30;
}

const isAddTourFirstElem = (day, elemTime, period) => elemTime.time - day.time >= period
const isAddTourLastElem = (day, elemTime, period) => day.time - elemTime.time >= period

const isAddTourPrevELemAndNext = (day, prevElem, nextElem, periodPrev, periodNext) => {
    return day.time - prevElem.time >= periodPrev && nextElem.time - day.time  >= periodNext;
}
function addTourDay(day, toursDays) {


    if (toursDays.length === 0) {
        toursDays.push(day);
        return toursDays;
    }
    const length = toursDays.length;
    for (let i = 0; i < length; i++) {

        const isLastElement = i === length -1;
        if(isAddTourFirstElem(day, toursDays[0], getTimePeriod(day, toursDays[0]))) {
            toursDays.push(day);
            break;
        } else if (isLastElement) {
            const lastTour = toursDays[length-1];
            const isAddTour = isAddTourLastElem(
                day,
                toursDays[length-1],
                getTimePeriod(day, lastTour)
            );
            if(isAddTour) {
                toursDays.push(day);
                break;
            }
        }else if (!isLastElement) {
            const prevTour = toursDays[i];
            const nextTour = toursDays[i+1];
            const isAddTour = isAddTourPrevELemAndNext(
                day,
                prevTour,
                nextTour,
                getTimePeriod(day, prevTour),
                getTimePeriod(day, nextTour),
            );
            if(isAddTour) {

                toursDays.push(day);
                break;
            }
        }
    }

    return toursDays.sort(((a, b) => a.time - b.time));

}

export default class TourLogic {
    constructor(pageName, currentLang = 'en', pageLang = 'en', type = 'city') {

        this.currentLang = currentLang;
        this.data = {};
        this.TOURS_CALENDAR_URL = `http://dev.oneporttest.com/wp-json/tour/v1/${pageLang}/${type}/{lang}/${pageName}`
        this.TOURS_CIVITATIS_CALENDAR_URL = `http://dev.oneporttest.com/wp-json/tour/civitatis/v1/city/departures/${pageLang}/{lang}/${pageName}`
        this.peopleNubmer = 1;
        this.date = {
            year: new Date().getFullYear(),
            month: null,
        }
        this.dataFilter = {};
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
        return this.data[this.currentLang]?.days ?? {}
    }

    getDaysNameByLocale(lang) {
        return this.data[lang]?.days ?? {}
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
        return this.filterDays({...this.data[this.currentLang].deps}, [day]);
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

    async getData() {
        if (this.data[this.currentLang] === undefined) {
            this.data[this.currentLang] = await this.fetchData();
        }

        return this;

    }

    getTourByMonth(month, year) {
        const days = this.getAllDaysMonth(month - 1, year);
        return this.filterDays({...this.data[this.currentLang].deps}, days);
    }

    filterDays(deps, days) {
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
                for(let i = 0; i < depsList.length; i++) {
                    const item = depsList[i];
                    if(!item.is_civitatis) {
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

                    if(isFirstFlag && isSecondFlag) {
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

    get urlData() {
        return this.TOURS_CALENDAR_URL.replace('{lang}', this.currentLang);
    }

    get civitatisUrlData() {
        if(typeof this.TOURS_CIVITATIS_CALENDAR_URL !== 'undefined') {
            return this.TOURS_CIVITATIS_CALENDAR_URL.replace('{lang}', this.currentLang)
        }
    }

    async fetchData() {
        if(typeof TOURS_CIVITATIS_CALENDAR_URL !== undefined) {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)
            let data = await Promise.allSettled([fetch(this.urlData), fetch(this.civitatisUrlData, { signal: controller.signal })]);
            clearTimeout(timeoutId);
            data = data.filter(item => !!item?.value).map(item => item.value);

            let [tours, civitatisTours]  = await Promise.allSettled(data.map(r => r.json())).catch((err) => {
                console.log(err)
            });
            tours = tours?.status === "fulfilled" ? tours.value : {};
            civitatisTours = civitatisTours?.status === "fulfilled" ? civitatisTours.value : {};
            tours.days = Object.assign(tours.days, civitatisTours.days);
            tours.subVendor = Object.assign(tours.subVendor, civitatisTours.subVendor);
            tours.tours = Object.assign(tours.tours, civitatisTours.tours);


            for (let key in civitatisTours.deps) {
                if(tours.deps[key]) {

                    tours.deps[key] = mergeDeep(tours.deps[key], civitatisTours.deps[key]);
                } else {
                    tours.deps[key] = civitatisTours.deps[key];
                }
            }
            return tours
        }
        else {
            const data = await fetch(this.urlData)
            return await data.json();
        }
    }
}
