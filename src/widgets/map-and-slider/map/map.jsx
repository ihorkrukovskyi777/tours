'use client';
// import { useEffect } from "react";
import { MapContainer, TileLayer , Marker } from 'react-leaflet';
import L from 'leaflet';
import MarkerDefault from '@/shared/ui/map/markers/marker';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import './style.css';




export default function Map() {
    const position = [51.505, -0.09]; 
    const position2 = [51.525, -0.09]; 


    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
       
      
                <Marker 
                    position={position}
                    icon={L.divIcon({html: renderToString(<MarkerDefault colors={['#444, #121 , #000']} icon="https://imagedelivery.net/xtVVrgn04XP6bhrBt0jaJQ/c63400a9-f210-4a41-5a95-604d8e46fc00/public"  /> ) })}   
                />
                 
    
    
     
      </MapContainer>
    )
}
