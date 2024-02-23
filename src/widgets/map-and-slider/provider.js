'use client'
import {useRef} from "react";
import dynamic from "next/dynamic";
import useOnScreen from "@/shared/hooks/useOnScreen";
import {log} from "util";

const MapAndSlider = dynamic(
    () => import("@/widgets/map-and-slider/map-and-slider"),
    {ssr: false}
)
export default function ProviderMap({i18n, locale, id, toursPlaces, buttonsShow = false, hideBottom = false}) {


    const ref = useRef(null)
    const refPrevSibling = (ref) => ref?.previousElementSibling ?? ref
    const refNexSibling = (ref) => ref.nextElementSibling ?? ref

    const isVisiblePrev = useOnScreen(ref,  refPrevSibling)
    const isVisibleNext = useOnScreen(ref,  refNexSibling)

    const isVisible = isVisiblePrev || isVisibleNext;

    return (
        <div ref={ref}>
            { isVisible ? <MapAndSlider hideBottom={hideBottom} i18n={i18n} locale={locale} id={id} toursPlaces={toursPlaces} buttonsShow={buttonsShow}/> : null }
        </div>
    )
}
