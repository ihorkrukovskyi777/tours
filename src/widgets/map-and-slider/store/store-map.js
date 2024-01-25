import { makeAutoObservable } from "mobx";
import { placesMarkers } from '@/entities/api';

export class StoreMap {
    constructor(id , locale) {
        this.places = [];
        
        makeAutoObservable(this, {}, {autoBind: true});
        this.fetchMarkers(id , locale);
    }

    * fetchMarkers(id , locale) {
        const places = yield placesMarkers(id, locale);
        let arrPlaces = places.filter(item => ((item.coordinates.latitude !== null && item.coordinates.longitude !== null)));
        arrPlaces.forEach(function (arr , index) {
            index === 0 ? arrPlaces[index]["status"] = 'active' : arrPlaces[index]["status"] = 'default';
        })   
        this.places = arrPlaces;
       
    }
    
    get sliders() {
        return this.places; 
    }

    get markers() {
        return this.places.filter(item => ((item.coordinates.latitude !== null && item.coordinates.longitude !== null)));
    }

 

}


