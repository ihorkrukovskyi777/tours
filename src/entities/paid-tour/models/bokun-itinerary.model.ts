import {makeAutoObservable, runInAction} from "mobx";
import {ModelImpl} from "@shared/hooks/use-client-model";
import {FetchTour, ICancellationFetch} from "@entities/paid-tour/api/fet-paid-tour";

import { PickupPlace, StartPoint} from "@/bokun-widget/src/@types/bokun";
import {Itinerary} from "@entities/paid-tour/@types";
export interface Pickup { startPoints: StartPoint[], pickups: PickupPlace[] , pickupService: boolean }


export class BokunItineraryModel implements ModelImpl {

    page_id: number

    locale: string
    itinerary: Itinerary[] = []
    pickup: Pickup = {startPoints: [], pickups: [], pickupService: false}
    cancellationPolicy: ICancellationFetch[] = []

    constructor(page_id: number, locale: string) {
        this.page_id = page_id;
        this.locale = locale;
        makeAutoObservable(this, {}, {autoBind: true})

    }

    get showTableMeetingPoint() {
        return !!this.pickup?.startPoints?.length
    }
    get showTablePickup() {
        return  !!this.pickup?.pickups?.length
    }
    get showTableItinerary() {
        return !!this.itinerary?.length
    }

    async fetchItinerary() {
        const fetchTour = new FetchTour(this.locale);
        const data = await fetchTour.getItinerary(this.page_id)
        runInAction(() => {
            this.itinerary = data;
        })
    }

    async fetchCancellationPolicy() {
        const fetch = new FetchTour(this.locale);
        const data = await fetch.getCancellationPolicy(this.page_id)
        runInAction(() => {
            this.cancellationPolicy = data;
        })
    }

    async fetchPickUp() {

        const fetchTour = new FetchTour(this.locale);
        const data = await fetchTour.getPickup(this.page_id)
        runInAction(() => {
            this.pickup = data
        })
    }

    async init() {
        await Promise.all([
            this.fetchItinerary(),
            this.fetchPickUp(),
            this.fetchCancellationPolicy(),
        ])
    }

    dispose() {

    }
}