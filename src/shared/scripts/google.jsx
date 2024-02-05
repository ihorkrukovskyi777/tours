'use client'
import {useEffect, useState} from "react";

export default function GoogleScript() {

    const [load, setLoad] = useState(false);
    useEffect(() => {
        window.addEventListener('load', () => {
            const loadScript = () => {
                window.removeEventListener('scroll', loadScript);
                setLoad(true);
            }
            window.addEventListener('scroll', loadScript)
        })
    }, [])

    if(load === false) {
        return null;
    }
    return (
        <>
            <script
                async={true}
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
                }}
            />
        </>

    )
}