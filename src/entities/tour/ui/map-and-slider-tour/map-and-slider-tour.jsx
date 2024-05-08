import dynamic from "next/dynamic";
import {placesMarkers} from "@/entities/api";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import PlacesFixedSeo from "@/shared/ui/seo-fixed/places";

const ProviderMap = dynamic(
    () => import("@/widgets/map-and-slider/provider"),
    {ssr: false}
)
export default async function MapAndSliderTour({children, hideBottom, locale, id}) {
    const places = await placesMarkers(id, locale, [id]);
    const i18n = await useDefaultI18n(locale);
    return (
        <>
            <ProviderMap places={places} hideBottom={hideBottom} locale={locale} id={id} i18n={i18n.getMapSliders()}>
                {children}
            </ProviderMap>
            <ul style={{display: "none"}} id="tour_places">
                {places?.map(place => <PlacesFixedSeo key={place.id} title={place.title} tickets={place.tickets}  attachment={place.attachment} i18n={i18n.getMapSliders()}/>)}
            </ul>
        </>
    )
}