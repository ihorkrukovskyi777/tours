import {atom} from 'jotai'
import {isTomorrowOrToday} from "@/shared/hepers/date";

export const atomService = atom(null)

export const atomLoading = atom(true);
export const atomInitService = atom(null, async (get, set) => {

    set(atomLoading, true);
    const service = get(atomService);
    const data = await service.getData();
    set(atomPagination, data.getDataMonth())
    set(atomDaysName, data.getDaysNameByLocale(get(atomDepLocale)))
    const details = service.data[get(atomDepLocale)];
    set(atomDepsDetails, {
        tours: details.tours,
        subVendor: details.subVendor,
    })
    set(atomService, service)
    set(atomLoading, false);
    set(atomNextPage);

})

export const atomChangeLanguage = atom(null, async (get, set, lang) => {
    set(atomDepLocale, lang);
    get(atomService).updateCurrentLang(lang)
    set(atomLoading, true);
    await set(atomChangePeople, 1);
    const details = get(atomService).data[get(atomDepLocale)];
    set(atomDepsDetails, {
        tours: details.tours,
        subVendor: details.subVendor,
    })
    set(atomLoading, false);
})
const atomReset = atom(null, (get, set) => {
    set(atomDepartures, []);
    set(atomAllDepartures, []);
    set(atomEndPagination, false);
})
export const atomPeople = atom(1, null);
export const atomChangePeople = atom(null, async (get, set, people) => {
    set(atomReset);

    set(atomPeople, people)
    get(atomService).updatePeopleNumber(get(atomPeople));
    const data = await get(atomService).getData()
    set(atomPagination, data.getDataMonth());
    set(atomNextPage)

})
export const atomDepLocale = atom(null);

export const atomDaysName = atom({}, null)
export const atomPagination = atom({})

export const atomDepartures = atom([]);

export const atomAllDepartures = atom([]);

export const atomEndPagination = atom(false);


export const atomNextPage = atom(null, (get, set) => {
    if (get(atomEndPagination) === false) {
        while(true) {
            const pagination = get(atomPagination);
            const data = pagination.next();

            if (data.done === false) {
                set(atomAllDepartures, [...get(atomAllDepartures), ...Object.values(data.value).flat()])
            }

            if(data.done || get(atomAllDepartures).length > 30) {
                break
            }

        }
        let spliceIndex = 10;
        if (get(atomDepartures).length === 0) {
            const findIndex = get(atomDepartures).findIndex(item => {
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

        set(atomDepartures, [...get(atomDepartures), ...get(atomAllDepartures).slice(get(atomDepartures).length, get(atomDepartures).length + spliceIndex)])
        set(atomEndPagination, !(get(atomDepartures).length < get(atomAllDepartures).length));
    }
});

export const atomEmptyDepartures = atom((get) => {
    return get(atomLoading) === false && get(atomDepartures).length === 0
}, null)

export const atomDepsDetails = atom({});

export const atomSelectedDep = atom(null);

export const atomSetSelected = atom(null, (get, set, id) => {
    const service = get(atomService);
    const allDep = get(atomAllDepartures);

    const find = allDep.find(item => item.depId === id);

    set(atomSelectedDep, {...find, tour: service.getTourTitlePost(find.tourId), subVendor: service.getSubVendor(find.subVendorId)})

})
