'use client'
import {useEffect, useRef} from "react";
import useOnScreen from "@/shared/hooks/useOnScreen";
import dynamic from "next/dynamic";
const SwiperGuides = dynamic(
    () => import("@/shared/ui/guides/swiper/swiper"),
    { ssr: false }
)

export default function LazyGuidesRow({guides}) {
    const ref= useRef(null)

    const refPrevSibling = (ref) => ref?.closest('section').previousElementSibling ?? ref?.closest('section')
    const refNexSibling = (ref) => ref?.closest('section').nextElementSibling ?? ref?.closest('section')

    const isVisiblePrev = useOnScreen(ref,  refPrevSibling)
    const isVisibleNext = useOnScreen(ref,  refNexSibling)

    const isVisible = isVisiblePrev || isVisibleNext;
    useEffect(() => {
        if(isVisible) {
            document.getElementById('hidden_mirage_guide')?.remove()
        }
    }, [isVisible])
    return (
        <div ref={ref}>
            {isVisible  ? <SwiperGuides guides={guides}/> : null}
        </div>
    )
}


