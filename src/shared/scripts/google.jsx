'use client'
import {useEffect, useState} from "react";
import Script from "next/script";
import {type} from "os";
export default function GoogleScript() {

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
            window.removeEventListener('touchstart', loadScript);
            window.removeEventListener('mousemove', loadScript);

            setTimeout(() => {
                const script = document.createElement('script')
                script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}`;
                document.body.append(script)
            }, 100)
        }
        window.addEventListener('mousemove', loadScript)
        window.addEventListener('touchstart', loadScript)

        return () => {
            window.removeEventListener('touchstart', loadScript)
            window.removeEventListener('mousemove', loadScript)
            const oldElement = document.querySelectorAll(`[src='https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}']`)
            if(oldElement?.length) {
               window.requestAnimationFrame(() => {
                   oldElement.forEach(elem => elem.remove());
               })
            }
        }

    }, [])

    useEffect(() => {
        const load = () => setLoad(true);
        window.addEventListener('scroll', load)
        return () => window.removeEventListener('scroll', load)
    }, [])

    if (load === false) {
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