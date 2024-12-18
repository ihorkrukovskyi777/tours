import {makeAutoObservable} from "mobx";
import {DepBooking} from "@entities/lib/calendar/@types";
import {DeparturesModel} from "@entities/lib/calendar/models/departures/departures.model";
import {ProcessOptionModel} from "@entities/lib/calendar/models/process-option.model";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {PATH_TOURS} from "@/shared/constants/route";
type Deps = { [key in string ]: { [key in string]:{ [key in string]: DepBooking[]}  }}
type SubVendor = {avatar: string, id: string, name: string, rating: number | null}
export interface DataTourSale {
    id: number
    title: string
    locale: string
    slug: string
    city: {
        slug: string
        title: string
    }
    attachment: {
        alt: string | null
        src: string | null
    }
    content: {
        title: string
        text: string[]
    }
    departure: {
        locales: [{code: string, id: number}]
    }
    departures: {
        deps: {
            deps: Deps,
            subVendor: { [key in string] : SubVendor}
            tours: { [key in string]: string }
        }
        timezone: string
    }
}
export class TourAdditionalModel {
    departures: DeparturesModel;

    departuresCalendar: DeparturesModel;
    constructor(readonly data: DataTourSale, option: ProcessOptionModel) {
        this.departures = new DeparturesModel(option)
        this.departures.setDepartures(data.departures.deps)
        this.departuresCalendar = new DeparturesModel(option)
        makeAutoObservable(this,{},{autoBind: true})
    }


    get locale() {
        return this.data.departure.locales[0].code
    }

    get title() {
        return this.data.title
    }

    get citySlug() {
        return this.data.city.slug
    }
    get slug() {
        const {locale, city, slug} = this.data
        return `${getHrefLocale(locale)}${city?.slug}/${PATH_TOURS}/${slug}`
    }
}