'use client'
import { useRef } from "react";
import useOnScreen from "@/shared/hooks/useOnScreen";
import dynamic from "next/dynamic";
const SwiperGuides = dynamic(
    () => import("@/shared/ui/guides/swiper/swiper"),
    { ssr: false }
)

export default function LazyGuidesRow({guides, title}) {
    const ref= useRef(null)
    const isVisible = useOnScreen(ref, (ref) => ref?.previousElementSibling ?? ref)

    return (
        <section className="guides_section" ref={ref}>
            <div className="container">
                <h2>Your Guides in Bogota {title}</h2>
                { isVisible ? <SwiperGuides guides={guides} /> : null }
            </div>
        </section>

    )
}
