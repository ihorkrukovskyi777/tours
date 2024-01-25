import {makeAutoObservable} from "mobx";
import {placesMarkers} from '@/entities/api';

export class StoreMap {
    constructor(id, locale) {
        this.places = [];
        this.selectedPlaceId = null;

        makeAutoObservable(this, {}, {autoBind: true});
        this.fetchMarkers(id, locale);
    }

    get currentIndexPlace() {
        return this.places.findIndex(place => place.id === this.selectedPlaceId)
    }
    * fetchMarkers(id, locale) {
        const places = yield placesMarkers(id, locale);
        this.places = places.filter(item => ((item.coordinates.latitude !== null && item.coordinates.longitude !== null)))
        this.selectedPlaceId =  places[0].id

    }
    setOpenMarker(id) {
        this.selectedPlaceId = id;
    }
    get slidersIndex() {
        return this.places.mak
    }
    get sliders() {
        return this.places ?? [];
    }

    get markers() {
        return this.places.filter(item => ((item.coordinates.latitude !== null && item.coordinates.longitude !== null)));
    }

}


