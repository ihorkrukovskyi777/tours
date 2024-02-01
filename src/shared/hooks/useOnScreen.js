import {useLayoutEffect, useMemo, useState} from "react";

export default function useOnScreen(ref, callback = (ref) => ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => {
            if (isIntersecting === false && entry.isIntersecting) {
                setIntersecting(entry.isIntersecting)
                observer.disconnect();
            }
        }
    ), [ref, isIntersecting])

    useLayoutEffect(() => {

        observer.observe(callback(ref.current))
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}
