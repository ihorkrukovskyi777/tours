'use client';
import {useEffect, useRef} from "react";
import {observer} from 'mobx-react-lite';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import MarkerDefault from '@/shared/ui/map/markers/marker';
import {renderToString} from 'react-dom/server';
import {StoreMapContext} from '../map-and-slider';
import {useContext} from 'react';
import L from 'leaflet';


import 'leaflet/dist/leaflet.css';
import './style.css';

let zIndex = 999;
export default observer(function Map({id, locale}) {
        const refMap = useRef(null);
        const {map: {markers, setOpenMarker, selectedPlaceId, fetchMarkers, setMap}} = useContext(StoreMapContext);

        const position = [51.505, -0.09];
        useEffect(() => {
            fetchMarkers(id, locale);
        }, [])

        useEffect(() => {
            setMap(refMap.current)
        }, [refMap.current])
        return (
            <MapContainer center={position} zoom={13} style={{height: '400px', width: '100%'}} ref={refMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker) => <Marker
                    key={marker.id}
                    zIndexOffset={marker.id === selectedPlaceId ?  zIndex : 1}
                    position={[marker.coordinates.latitude, marker.coordinates.longitude]}
                    size={'small'}
                    status={marker.status}
                    eventHandlers={{
                        click: () => {
                            setOpenMarker(marker.id);
                        },
                    }}
                    icon={L.divIcon({
                        html: renderToString(
                            <MarkerDefault
                                id={marker.id}
                                isActive={marker.id === selectedPlaceId}
                                status={'default'}
                                colors={['#444, #121 , #000']}
                                icon={marker.attachment.src}
                            />)
                    })}
                />)}

            </MapContainer>
        )
    }
)
