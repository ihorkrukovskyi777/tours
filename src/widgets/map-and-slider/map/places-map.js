import { Map } from "leaflet";


export class PlacesMaps {
    constructor(rootId) {
        this.root = document.getElementById(rootId);
        this.markers = [];
        this.leaf = L;
        this.layers = null;
        this.map = null;
        this.initFirst = true;
        this.zIndex = 200000;
        this.zIndexActive = 10000;
    }

    resetActiveMarker(place_id) {
        this.markers = this.markers.map(marker => {
            marker.marker.active = false
            marker.marker.isActivetesMarker = false;
            return marker;
        });

        this.markers.forEach(({marker, mapPoint}) => {
            if (mapPoint.options.custom?.place_id !== place_id) {
                mapPoint.setIcon(this.leaf.divIcon({
                    iconSize: marker.size,
                    html: marker.html
                }))
                mapPoint.options.custom.selected = false
            }

        })
    }

    moveToSlide(id, centered = true) {
        const marker = this.markers.find(({marker}) => marker.place_id === id);
        const find = placeController.model.places.find(place => place.place_id === id);
        if (find && !find?.getToursIds()?.includes(placeController.model.selectPostId)) {
            placeController.model.selectPostId = null;
            placeController.viewPost.removeAllActivePost();
            this.resetActiveMarker(find.place_id);
        }

        if (marker?.marker) {
            this.setDefaultMarkerHtml();
            marker.mapPoint.options.custom.selected = true;
            if (centered) {
                this.centerMap([marker.marker]);
            } else {
                this.map.panTo([marker.marker.latitude, marker.marker.longitude], {duration: 0.5, easeLinearity: 0.25});
            }
            this.setActiveHtmlMarker(marker.mapPoint, marker.marker)
        } else {
            this.setDefaultMarkerHtml();
        }
    }

    bounds(places) {
        return places.map(item => [item.latitude, item.longitude])
    }

    centerMap(active = false) {
        const bounds = new L.featureGroup(this.markers.filter(item => item.marker.active === active).map(item => item.mapPoint));
        if(Object.keys(bounds._layers).length) {
            this.map.fitBounds(bounds.getBounds().pad(0.5), { duration: 0.2 });

        }

    }

    initMap() {
        this.map = this.leaf.map('map_leafletjs').setView([51.505, -0.09], 13);
        this.leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(this.map);
    }

    getMarkerById(id) {
        return this.markers.find(({marker}) => marker.place_id === id);
    }

    createMarker(marker, isSelect = false) {
        const icon = this.leaf.divIcon({
            className: marker.className,
            iconSize: marker.size,
            html: isSelect ? marker.selectedHTML : marker.html
        });
        const mapPoint = this.leaf.marker(marker.coordinate, {
            icon,
            custom: {
                colors: marker.colors,
                place_id: marker.place_id,
                selected: isSelect,
            }
        });

        if (marker.active) {
            this.zIndexActive++;
            mapPoint.setZIndexOffset(this.zIndexActive);
        }
        if (isSelect) {
            this.zIndex++;
            mapPoint.setZIndexOffset(this.zIndex);
        }
        this.markers.push({
            marker,
            mapPoint,
        });
        return mapPoint;
    }

    setDefaultMarkerHtml() {
        this.markers.forEach(({marker, mapPoint}) => {
            if (mapPoint.options.custom?.selected) {
                mapPoint.setIcon(this.leaf.divIcon({
                    iconSize: marker.size,
                    html: marker.html,
                    forceZIndex: 0,
                }))
                mapPoint.options.custom.selected = false
            }

        })
    }

    setActiveHtmlMarker(point, marker) {
        point.options.custom.selected = true;
        point.setIcon(this.leaf.divIcon({
            iconSize: marker.selectSize,
            html: marker.selectedHTML
        }));
        this.zIndex = this.zIndex + 20;
        point.setZIndexOffset(this.zIndex);
    }

    deactivatedHtmlMarker(point, marker) {
        point.options.custom.selected = false;
        point.setIcon(this.leaf.divIcon({
            iconSize: marker.size,
            html: marker.html,
        }));
        point.setZIndexOffset(1);
    }

    updateMarker(markers, selectedPlaceId) {
        for(let i = 0; i < this.markers.length; i++){
            this.markers[i].mapPoint.remove()
        }
        this.markers = [];
        const resultsPoints = [];
        markers.forEach((marker) => {
            const point = this.createMarker(marker, marker.place_id === selectedPlaceId).on('click', (e) => {

                const {target} = e;
                const {marker} = this.getMarkerById(target.options.custom.place_id);

                if (target.options.custom.selected) {
                    this.deactivatedHtmlMarker(target, marker)
                    return
                }

                this.setDefaultMarkerHtml();
                this.setActiveHtmlMarker(target, marker)

                applyEvent(PLACE_EVENTS.SELECT_POINT, marker.place_id);
            });
            resultsPoints.push(point);
            this.map.addLayer(point);
        })

    }

}