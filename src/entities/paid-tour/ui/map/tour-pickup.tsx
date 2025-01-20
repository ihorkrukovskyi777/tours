'use client'
import {observer} from "mobx-react-lite";
import {Pickup} from "@entities/paid-tour/models/bokun-itinerary.model";
import {useTranslations} from "next-intl";
import GoogleMapsMarker from "@entities/paid-tour/ui/map/google-maps-marker";

interface Props {
    pickup: Pickup
    type: 'meeting' | 'pickup'
}

const Stops = observer(({pickup}: Omit<Props, 'type'>) => {
    const t = useTranslations()
    return (
        <div>
            <h3>{t('weOfferPickupNotice')}</h3>
            <ul className="ui_list_dots">
                {pickup.pickups?.map(pickup => <li key={pickup.id}>{pickup.title}</li>)}
            </ul>
        </div>
    )
})

const StartPoint = observer(({pickup}: Omit<Props, 'type'>) => {
    const t = useTranslations()
    return (
        <div>
            <h2>{t('youCanStarPickup')}</h2>
            {pickup.startPoints.map(point => {
                return (
                    <div key={point.id}>
                        <h3>{point.title}</h3>
                        <p>{point.address.addressLine1}</p>
                        {point.address.geoPoint.latitude && point.address.geoPoint.longitude ?
                            <GoogleMapsMarker
                                lng={point.address.geoPoint.longitude}
                                lat={point.address.geoPoint.latitude}
                                zoom={point.address.mapZoomLevel}/>
                            : null}
                    </div>
                )
            })}
        </div>
    )
})
const TourPickup = observer(({pickup, type }: Props) => {
    return type === 'pickup' ? <Stops pickup={pickup}/> : <StartPoint pickup={pickup}/>

})

export default TourPickup