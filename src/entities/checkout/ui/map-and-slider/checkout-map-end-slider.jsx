import dynamic from "next/dynamic";

import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {placesMarkersCheckout} from "@/entities/api";

const MapAndSlider = dynamic(
    () => import("@/widgets/map-and-slider/map-and-slider"),
    {ssr: false}
)


export default async function CheckoutMapEndSlider({ locale, tourId }) {
    const results = await placesMarkersCheckout(tourId, locale);
    const i18n = await useDefaultI18n(locale);
    if(!Array.isArray(results?.places) || !results.places.length) {
        return null;
    }

    const { tours, places } = results;

    return (
        <MapAndSlider
            hideBottom={false}
            i18n={i18n.getMapSliders()}
            locale={locale}
            id={tourId}
            places={places}
            toursPlaces={tours}
            buttonsShow={true}
            selectedTourDefault={tourId}
        >
        </MapAndSlider>
    )
}