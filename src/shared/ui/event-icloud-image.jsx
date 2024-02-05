'use client'
import {useEffect, useState} from "react";
import Image from "next/image";

export default function EventIcloudImage( { src , size = 'public', alt = '',isMobile = false, ...props}) {

    const [isEvent, setIsEvent] = useState(!isMobile);

    useEffect(() => {
        const scroll = () => {
            setIsEvent(true)
            window.removeEventListener('scroll', scroll)
        };
        window.addEventListener('scroll', scroll, false)
    }, [])

    if(typeof src !== 'string' || !!src === false || isEvent === false) {
        return null;
    }

    if(src.includes('http') || src.includes('https') ) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} />
    }
    return <Image  src={`${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${src}/${size}`} alt={alt ?? ''} {...props} ></Image>
}
