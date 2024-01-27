'use client'
import dynamic from "next/dynamic";
import useOnScreen from "@/shared/hooks/useOnScreen";
import {useRef} from "react";

const CalendarProvider = dynamic(() => import("@/entities/calendar/calendar-provider"), {
    ssr: false,
});

export default function Test(props) {
    const ref = useRef(null)

    const isVisible = useOnScreen(ref)
    return (
        <div ref={ref}>
            {isVisible ? <CalendarProvider {...props} /> : null}
        </div>
    )
}
