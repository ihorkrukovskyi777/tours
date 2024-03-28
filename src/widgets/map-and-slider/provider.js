'use client'
import {useEffect, useState, useRef} from "react";
import dynamic from "next/dynamic";
import useOnScreen from "@/shared/hooks/useOnScreen";

const MapAndSlider = dynamic(
    () => import("@/widgets/map-and-slider/map-and-slider"),
    {ssr: false}
)
export default function ProviderMap({i18n, locale, id, places, toursPlaces, buttonsShow = false, hideBottom = false, children}) {

    const [isScroll, setScroll] = useState(false);
    const ref = useRef(null)
    const refPrevSibling = (ref) => ref?.previousElementSibling ?? ref
    const refNexSibling = (ref) => ref.nextElementSibling ?? ref

    const isVisiblePrev = useOnScreen(ref,  refPrevSibling)
    const isVisibleNext = useOnScreen(ref,  refNexSibling)

    const isVisible = isVisiblePrev || isVisibleNext || isScroll;

    useEffect(() => {
        const scroll = () => {
            window.removeEventListener('scroll', scroll)
            setScroll(true);
        }
        window.addEventListener('scroll', scroll)
        return () => window.removeEventListener('scroll', scroll)
    }, [])


    return (
        <div ref={ref}>
            { isVisible ?
                <MapAndSlider
                    hideBottom={hideBottom}
                    i18n={i18n}
                    locale={locale}
                    id={id}
                    places={places}
                    toursPlaces={toursPlaces}
                    buttonsShow={buttonsShow}
                >
                    {children}
                </MapAndSlider>
                : null }
        </div>
    )
}
