import {makeAutoObservable} from "mobx";
import {placesMarkers} from '@/entities/api';
import L from 'leaflet';


export class StoreMap {
    constructor(id) {
        this.currentId = id;
        this.selectedTourId = null;
        this.places = [];
        this.selectedPlaceId = null;
        this.swiper = null;
        this.map = null;
        this.initialSlide = 0;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setSwiper(swiper) {
        this.swiper = swiper
    }

    resetSelectedTour() {
        this.selectedTourId = null;
        this.selectedPlaceId = this.places[0].id
        this.centerMap();
    }

    get shortToursTitle() {
        const titles = {};

        for (const item of this.places) {
            Object.assign(titles, item.tours)
        }
        return titles;
    }

    setMap(map) {
        if (map) {
            this.map = map;
            this.centerMap();
        }
    }

    setSelectedTourId(id) {
        this.selectedTourId = id;
        this.setSlideSelectedPlace(this.sliders[0].id);
        this.centerMap();

    }

    setSlideSelectedPlace(id) {
        this.selectedPlaceId = id
    }

    centerMap() {
        const bounds = new L.LatLngBounds(this.markers.filter(place => place.status === 'default').map(item => item.coordinates));

        if (Object.keys(bounds).length) {
            this.map.fitBounds(bounds.pad(0.5));

        }

    }

    setCenterMarker() {
        const find = this.markers.find(marker => marker.id === this.selectedPlaceId);
        if(find) {
            console.log(find.coordinates)
            this.map?.panTo(find.coordinates, {duration: 0.5, easeLinearity: 0.25});
        }
    }

    get currentIndexPlace() {
        return this.sliders.findIndex(place => place.id === this.selectedPlaceId)
    }

    * fetchMarkers(id, locale, ids = []) {

        if (ids.length) {
            this.typePage = 'city';
        }
        this.places = yield placesMarkers(id, locale, ids);
        if (this.places[0]) {
            this.selectedPlaceId = this.places[0].id

        }

    }

    remove() {
        this.places = this.places.slice(1, this.places.length)
    }

    setOpenMarkerBySlide(id) {
        this.selectedPlaceId = id;
    }

    setOpenMarker(id) {
        this.selectedPlaceId = id;
        if (this.selectedTourId) {
            const find = this.markers.find(place => place.id === id);
            if (!find?.tours[this.selectedTourId]) {
                this.selectedTourId = null;
                this.initialSlide = this.sliders.findIndex(place => place.id === id)
            }
        } else {
            const findIndex = this.sliders.findIndex(place => place.id === id);
            this.swiper.slideToLoop(findIndex)
        }
    }

    get sliders() {
        if (this.selectedTourId) {
            return this.places.filter(item => (!!item.tours[this.selectedTourId]))
        }
        return this.places ?? [];
    }

    get markers() {
        return this.places.filter(item => item.coordinates.latitude && item.coordinates.longitude).map(item => {
            const type = this.selectedTourId === null;
            return {
                coordinates: [item.coordinates.latitude, item.coordinates.longitude],
                status: type ? 'default' : item.tours[this.selectedTourId] ? 'default' : 'small',
                id: item.id,
                tours: {...item.tours},
                src: item.attachment?.src,
                colors: [...item.colors],
            }
        });
    }

}


