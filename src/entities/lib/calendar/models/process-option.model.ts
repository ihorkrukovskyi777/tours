import {makeAutoObservable} from "mobx";
import {ActiveLocale} from "@entities/lib/calendar/@types/locales";
import {ProcessOption} from "@entities/lib/calendar/@types/process-option";
import {TourType} from "@entities/lib/calendar/@types";

export class ProcessOptionModel {
    private _locale: string
    availableLocale: ActiveLocale[] = []
    peopleNumber: number

    readonly page: { title: string, id: number, type: TourType, nameDayWeek: boolean, locale: string, isGuide: boolean }

    constructor(option: ProcessOption, peopleNumber: number = 1) {
        this._locale = option.locale
        this.availableLocale = option.activeLanguage;
        this.peopleNumber = peopleNumber
        this.page = {
            title: option.title,
            type: option.type,
            id: option.id,
            nameDayWeek: option.nameDayWeek,
            locale: option.locale,
            isGuide: option.isGuide
        }
        makeAutoObservable(this, {}, {autoBind: true})
    }


    get locale() {
        const find = this.availableLocale.find(item => item.code === this._locale);
        if (find) return this._locale
        return this.availableLocale[0]?.code ?? 'en'
    }


    setLocale(locale: string) {
        this._locale = locale
        this.peopleNumber = 1
    }

    setPeople(val: number) {
        this.peopleNumber = val > 0 ? val : 1
    }

}