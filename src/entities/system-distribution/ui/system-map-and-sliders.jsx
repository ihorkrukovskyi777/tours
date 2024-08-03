import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {getSystemPlaces} from "@/entities/system-distribution/api";
import dynamic from "next/dynamic";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";

const ProviderMap = dynamic(() => import("@/widgets/map-and-slider/provider"), {
    ssr: false,
});
export default async function SystemMapAndSliders({id, locale, flexible}) {
    const {places, toursPlaces} = await getSystemPlaces(id, locale)
    const i18n = await useDefaultI18n(locale);
    const { title } = getContentFlexibleTitle(flexible, locale)
    return (
        <ProviderMap
            hideBottom={true}
            i18n={{...i18n.getMapSliders(), tour_features: title}}
            id={0}
            locale={locale}
            places={places}
            toursPlaces={Object.values(toursPlaces ?? {})}
            buttonsShow={true}
        />
    )
}