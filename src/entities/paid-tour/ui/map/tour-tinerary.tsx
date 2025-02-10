'use client'
import ShowMapAfterClick from "@entities/paid-tour/ui/map/show-map-after-click";
import {observer} from "mobx-react-lite";
import {Itinerary} from "@entities/paid-tour/@types";


interface Props {
    itinerary: Itinerary[]
}

const TourItinerary = observer(({ itinerary}: Props) => {

    return (
        <>
            {itinerary?.map((item, index) => {
                return (
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p dangerouslySetInnerHTML={{__html: item.body}}></p>

                        {item.location.latitude && item.location.longitude ?
                            <ShowMapAfterClick
                                lat={item.location.latitude}
                                lng={item.location.longitude}
                                zoom={item.location.zoomLevel * 2.5}/>
                            : null}
                    </div>
                )
            })}
        </>
    )
})

export default TourItinerary