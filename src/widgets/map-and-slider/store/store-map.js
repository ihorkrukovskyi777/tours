import {makeAutoObservable} from "mobx";
import {placesMarkers} from '@/entities/api';
import L from 'leaflet';

let eventSlide = false;

export class StoreMap {
    constructor() {
        this.places = [];
        this.selectedPlaceId = null;
        this.swiper = null;
        this.map = null;
        eventSlide = false
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setMap(map) {
        if (map) {
            this.map = map;
            this.centerMap();
        }
    }

    setSwiper(swiper) {
        if (this.swiper === null) {
            this.swiper = swiper;
            window.swiper = swiper;
            this.swiper.on('slideChange', (v, e) => {
                if (eventSlide) {
                    eventSlide = false
                    return;
                }
                const place = this.places[v.slides[v.activeIndex].dataset.swiperSlideIndex]
                if (place) {
                    this.setSlideSelectedPlace(place.id)
                    if (place.coordinates.latitude && place.coordinates.longitude && this.map) {
                        this.map.setView([place.coordinates.latitude, place.coordinates.longitude])
                    }

                }
            })
        }

    }

    setSlideSelectedPlace(id) {
        this.selectedPlaceId = id
    }

    centerMap() {
        const bounds = new L.LatLngBounds(this.markers.map(item => [item.coordinates.latitude, item.coordinates.longitude]));
        this.map.fitBounds(bounds);
    }

    get currentIndexPlace() {
        return this.places.findIndex(place => place.id === this.selectedPlaceId)
    }

    * fetchMarkers(id, locale) {
        const places = yield placesMarkers(id, locale);
        this.places = places.sort((a, b) => a.order - b.order)
        if (places[0]) {
            this.selectedPlaceId = places[0].id
        }

    }
    remove() {
        this.places = this.places.slice(1, this.places.length)
    }
    setOpenMarker(id) {
        this.selectedPlaceId = id;

        const find = this.places.find(item => item.id === id);
        eventSlide = true;

        const element = document.querySelector(`[data-place-id="${find.id}"]`).parentNode

        this.swiper.slideToLoop((element.dataset.swiperSlideIndex * 1), 500, false)
    }

    get sliders() {
        return this.places ?? [];
    }

    get markers() {
        return this.places.filter(item => ((item.coordinates.latitude !== null && item.coordinates.longitude !== null)));
    }

}


