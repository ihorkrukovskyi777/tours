import {TourType} from "@entities/lib/calendar/@types/index";
import {ActiveLocale} from "@entities/lib/calendar/@types/locales";

export interface ProcessOption {
    i18n: { [key in string]: string }
    title: string
    locale: string
    type: TourType
    id: number
    activeLanguage: ActiveLocale[]
    nameDayWeek: boolean
}