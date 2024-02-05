'use client'
import {useRef} from "react";
import dynamic from "next/dynamic";
import useOnScreen from "@/shared/hooks/useOnScreen";
import {log} from "util";

const MapAndSlider = dynamic(
    () => import("@/widgets/map-and-slider/map-and-slider"),
    {ssr: false}
)
export default function ProviderMap({i18n, locale, id, toursPlaces, buttonsShow}) {
    const ref = useRef(null)
    const isVisible = useOnScreen(ref)

    return (
        <div ref={ref}>
            { isVisible ? <MapAndSlider i18n={i18n} locale={locale} id={id} toursPlaces={toursPlaces} buttonsShow={buttonsShow}/> : null }
        </div>
    )
}
