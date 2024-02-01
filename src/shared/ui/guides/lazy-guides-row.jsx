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
    const isVisible = useOnScreen(ref, (ref) => ref?.closest('section') ?? ref)
    useEffect(() => {
        if(isVisible) {
            document.getElementById('hidden_mirage_guide')?.remove()
        }
    }, [isVisible])
    return (
        <div ref={ref}>
            {isVisible ? <SwiperGuides guides={guides}/> : null}
        </div>
    )
}


