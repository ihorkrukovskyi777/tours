'use client'
import {useEffect, useState} from "react";
import Script from "next/script";
import {type} from "os";

export default function GoogleScript() {

    const [load, setLoad] = useState(false);


    const [scrollPosition, setScrollPosition] = useState(0);
    const [documentHeight, setDocumentHeight] = useState(0)
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        const docHeight = document.querySelector('body').scrollHeight - window.innerHeight - 100;
        setDocumentHeight(docHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    if (typeof window !== 'undefined') {
        scrollPosition > documentHeight ? document.querySelector('body').classList.add('scroll-down-captcha') : document.querySelector('body').classList.remove('scroll-down-captcha')
    }
    useEffect(() => {

        const loadScript = () => {
            if (typeof window === 'undefined') {
                return;
            }
            window.removeEventListener('touchstart', loadScript);
            window.removeEventListener('mousemove', loadScript);
            setLoad(true);
            const script = document.createElement('script')
            script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}`;
            document.body.append(script)
        }
        window.addEventListener('mousemove', loadScript)
        window.addEventListener('touchstart', loadScript)

        return () => {
            window.removeEventListener('touchstart', loadScript)
            window.removeEventListener('mousemove', loadScript)
            const oldElement = document.querySelectorAll(`[src='https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RE_CAPTCHA_KEY}']`)
            if (oldElement?.length) {
                window.requestAnimationFrame(() => {
                    oldElement.forEach(elem => elem.remove());
                })
            }
        }

    }, [])


    return (
        <>
            <Script
                async={true}
                id="script-gtag"
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script
                async={true}
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                    console.log('analytics');
                     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');;
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                
                
                 window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
            
                    const consentDenied = {
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'analytics_storage': 'denied'
                    };
                    const consentGranted = {
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted',
                        'ad_storage': 'granted',
                        'analytics_storage': 'granted',
                        'functionality_storage': 'granted',
                        'personalization_storage': 'granted',
                        'security_storage': 'granted',
                    }
            
                    // Set default consent to 'denied' as a placeholder
                    // Determine actual values based on your own requirements
                    gtag('consent', 'default', consentDenied);
            
                    function updateGtag() {
                        gtag('consent', 'update', consentGranted);
                    }
            
                    const consentSuggestion = window.localStorage.getItem('consent_suggestion')
                    if(consentSuggestion === 'true') updateGtag()
            `,
                }}
            />
        </>

    )
}