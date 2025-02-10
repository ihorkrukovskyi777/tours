'use client'
import {memo} from "react";
import { GoogleMap, useJsApiLoader , Marker} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px',
}

export interface Props {
    zoom: number
    lat: number
    lng: number
}

function GoogleMapMarker({ zoom, lat, lng}: Props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
    })


    return isLoaded ? (
        <GoogleMap
            options={{
                cameraControl: false,
                fullscreenControl: false,
                scaleControl: false,
                zoomControl: false,
                mapTypeControl: false,
                panControl: false,
                streetViewControl: false,
            }}
            mapContainerStyle={containerStyle}
            center={{lat, lng}}
            zoom={zoom}
        >
            <Marker position={{lat, lng}}/>
        </GoogleMap>
    ) : (
        <></>
    )
}

export default memo(GoogleMapMarker)