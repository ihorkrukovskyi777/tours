'use client'
import {useEffect, useState} from "react";
import Script from "next/script";
import {type} from "os";
export default function GoogleScript({ locale }) {

    const [load, setLoad] = useState(false);


    const [scrollPosition, setScrollPosition] = useState(0);
    const [documentHeight , setDocumentHeight] = useState(0)
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        const docHeight = document.querySelector('body').scrollHeight - window.innerHeight - 100;
        setDocumentHeight(docHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    if(typeof window !== 'undefined') {
        scrollPosition > documentHeight ? document.querySelector('body').classList.add('scroll-down-captcha') : document.querySelector('body').classList.remove('scroll-down-captcha')
    }
    useEffect(() => {

        const loadScript = () => {

            if(typeof window === 'undefined') {
                return;
            }
            console.log('loadScript', 'loadScript')

            window.removeEventListener('scroll', loadScript);
            window.removeEventListener('mousemove', loadScript);
            setLoad(true);

            const script = document.createElement('script')
            script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}`;
            document.body.append(script)
        }
        window.addEventListener('mousemove', loadScript)

        return () => {
            window.removeEventListener('scroll', loadScript)
            window.removeEventListener('mousemove', loadScript)
            const oldElement = document.querySelectorAll(`[src='https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}']`)
            if(oldElement?.length) {
               window.requestAnimationFrame(() => {
                   oldElement.forEach(elem => elem.remove());
               })
            }
        }

    }, [])

    if (load === false || true) {
        return null;
    }
    return (
        <>
            <Script
                strategy="lazyOnload"
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