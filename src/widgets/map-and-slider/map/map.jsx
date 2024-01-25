'use client';
// import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { MapContainer, TileLayer , Marker } from 'react-leaflet';
import L from 'leaflet';
import MarkerDefault from '@/shared/ui/map/markers/marker';
import { renderToString } from 'react-dom/server';
import { StoreMapContext } from '../map-and-slider';
import { useContext, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import './style.css';


export default observer( function Map({data}) {
    const {map : {markers}} = useContext(StoreMapContext);

    const position = [51.505, -0.09];

    const [ markerActive, setMarkerActive ] = useState(false);
 

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => <Marker 
            key={marker.id}
            position={[marker.coordinates.latitude , marker.coordinates.longitude]}
            size={'small'}
            status={marker.status}
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e)
                setMarkerActive(true);
              },
            }}
            icon={L.divIcon({html: renderToString(
              <MarkerDefault 
                status={marker.status}
                markerActive={markerActive}
                colors={['#444, #121 , #000']}
                icon={marker.attachment.src}
              /> ) })}
        />)}
   
      </MapContainer>
    )
}
)
