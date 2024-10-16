'use client'
import {useRef} from "react";
import useOnScreen from "@/shared/hooks/useOnScreen";
import dynamic from "next/dynamic";
const SwiperHighlights = dynamic(
    () => import("@/widgets/highlights/slider"),
    { ssr: false }
)

export default function LazyHighlights({images}) {
    const ref= useRef(null)
    return (
        <div ref={ref}>
             <SwiperHighlights images={images}/>
        </div>
    )
}
