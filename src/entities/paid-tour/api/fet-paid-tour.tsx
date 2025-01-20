import {Fetch} from "@entities/paid-tour/api/fetch";
import {BokunTourBanner, BokunTourInfo, CardExperience, Itinerary} from "@entities/paid-tour/@types";
import {IBokunCancellationPolicy, PickupPlace, StartPoint} from "@/bokun-widget/src/@types/bokun";

interface LocalesPage {
    slug: string
    title: string
    locale: string
    id: number
}
export interface ICancellationFetch {
    rate_id: number
    title: string,
    timeZone: string,
    cancellationPolicy: IBokunCancellationPolicy
}
interface TourPageLocale {
    city: LocalesPage
    tour: LocalesPage
}
export class FetchTour extends Fetch {
    locale: string

    constructor(locale: string) {
        super();
        this.locale = locale

    }

    async getItinerary(id: number) {
        return this.get<Itinerary[]>(`bokun/web/tour/${id}/itinerary?locale=${this.locale}`)

    }
    async getCancellationPolicy(id: number) {
        return this.get<ICancellationFetch[]>(`bokun/web/tour/${id}/cancellation-policy`)
    }
    async getTourBanner(id: number) {
        return this.get<BokunTourBanner>(`bokun/web/tour/${id}/banner?locale=${this.locale}`, '',)
    }

    async getBokunInfo(id: number) {
        return this.get<BokunTourInfo>(`bokun/web/tour/${id}/info?locale=${this.locale}`, '',)
    }


    async getSimilar(id: number) {
        return this.get<CardExperience[]>(`tour/paid-similar/${id}?locale=${this.locale}`, '',)
    }
    async getLocalesTourPage(id: number) {
        return this.get<TourPageLocale[]>(`bokun/web/tour/${id}/locales`)
    }

    async getPickup(id: number) {
        return this.get<{ startPoints: StartPoint[], pickups: PickupPlace[], pickupService: boolean }>(`bokun/web/tour/${id}/pickup?locale=${this.locale}`)
    }

}