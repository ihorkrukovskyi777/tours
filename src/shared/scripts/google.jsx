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
            <div id="klaro" style={{zIndex: 9999}}></div>
            <Script
                async={true}
                defer={true}
                id="script-gtag"
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script
                id="klaro-script-include"
                defer={true}
                data-config="klaroConfig"
                type="application/javascript"
                src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"
            />
            <Script
                id="klaro-script-inner"
                dangerouslySetInnerHTML={{
                    __html: `
                   /*
By default, Klaro will load the config from a global 'klaroConfig' variable. You
can change this by specifying the 'data-klaro-config' attribute on your script:
<script src="klaro.js" data-klaro-config="myConfigVariableName"
*/
var klaroConfig = {
    /*
    Setting 'testing' to 'true' will cause Klaro to not show the consent notice or
    modal by default, except if a special hash tag is appended to the URL (#klaro-
    testing). This makes it possible to test Klaro on your live website without
    affecting normal visitors.
    */
    testing: false,

    /*
    You can customize the ID of the DIV element that Klaro will create when starting
    up. By default, Klaro will use 'klaro'.
    */
    elementID: 'klaro',

    /*
    You can customize how Klaro persists consent information in the browser. Specify
    either cookie' (the default) or 'localStorage'.
    */
    storageMethod: 'cookie',

    /*
    You can customize the name of the cookie or localStorage entry that Klaro will
    use for storing the consent information. By default, Klaro will use 'klaro'.
    */
    storageName: 'klaro',

    /*
    If set to \`true\`, Klaro will render the texts given in the
    \`consentModal.description\` and \`consentNotice.description\` translations as HTML.
    This enables you to e.g. add custom links or interactive content.
    */
    htmlTexts: false,

    /*
    You can change the cookie domain for the consent manager itself. Use this if you
    want to get consent once for multiple matching domains. By default, Klaro will
    use the current domain. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    cookieDomain: 'strawberrytours.com',

    /*
    You can also set a custom expiration time for the Klaro cookie. By default, it
    will expire after 30 days. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    cookieExpiresAfterDays: 30,

    /*
    Defines the default state for services in the consent modal (true=enabled by
    default). You can override this setting in each service.
    */
    default: true,

    /*
    If 'mustConsent' is set to 'true', Klaro will directly display the consent
    manager modal and not allow the user to close it before having actively
    consented or declined the use of third-party services.
    */
    mustConsent: true,

    /*
    Setting 'acceptAll' to 'true' will show an "accept all" button in the notice and
    modal, which will enable all third-party services if the user clicks on it. If
    set to 'false', there will be an "accept" button that will only enable the
    services that are enabled in the consent modal.
    */
    acceptAll: true,

    /*
    Setting 'hideDeclineAll' to 'true' will hide the "decline" button in the consent
    modal and force the user to open the modal in order to change his/her consent or
    disable all third-party services. We strongly advise you to not use this
    feature, as it opposes the "privacy by default" and "privacy by design"
    principles of the GDPR (but might be acceptable in other legislations such as
    under the CCPA)
    */
    hideDeclineAll: false,

    /*
    Setting 'hideLearnMore' to 'true' will hide the "learn more / customize" link in
    the consent notice. We strongly advise against using this under most
    circumstances, as it keeps the user from customizing his/her consent choices.
    */
    hideLearnMore: false,

    /*
    You can overwrite existing translations and add translations for your service
    descriptions and purposes. See \`src/translations/\` for a full list of
    translations that can be overwritten:
    https://github.com/KIProtect/klaro/tree/master/src/translations
    */
    translations: {
        /*
        The \`zz\` key contains default translations that will be used as fallback values.
            This can e.g. be useful for defining a fallback privacy policy URL.
        */
        zz: {
            privacyPolicyUrl: '/legal',

        },
        de: {
            /*
            You can specify a language-specific link to your privacy policy here.
            */
            privacyPolicyUrl: '/de/rechtliches',
            consentNotice: {
                description: 'Dieser Text wird in der Einwilligungsbox erscheinen.',
            },
            consentModal: {
                description:
                    'Hier kÃ¶nnen Sie einsehen und anpassen, welche Information wir Ã¼ber Sie ' + 
                    'sammeln. EintrÃ¤ge die als "Beispiel" gekennzeichnet sind dienen lediglich ' + 
                    'zu Demonstrationszwecken und werden nicht wirklich verwendet.',
            },
            /*
            You should also define translations for every purpose you define in the
            'services' section. You can define a title and an (optional) description.
            */
            purposes: {
                analytics: {
                    title: 'Besucher-Statistiken'
                },
                security: {
                    title: 'Sicherheit'
                },
                livechat: {
                    title: 'Live Chat'
                },
                advertising: {
                    title: 'Anzeigen von Werbung'
                },
                styling: {
                    title: 'Styling'
                },
            },
        },
        en: {
            privacyPolicyUrl: '/legal',
     
            purposes: {
                analytics: {
                    title: 'Analytics'
                },
                security: {
                    title: 'Security'
                },
                livechat: {
                    title: 'Livechat'
                },
                advertising: {
                    title: 'Advertising'
                },
                styling: {
                    title: 'Styling'
                },
            },
        },
    },

    /*
    Here you specify the third-party services that Klaro will manage for you.
    */
    services: [
     {
            name: 'google-tag-manager',
            purposes: ['marketing'],
            onAccept: \`
                // we notify the tag manager about all services that were accepted. You can define
                // a custom event in GTM to load the service if consent was given.
                console.log(opts.consents);
                for(let k of Object.keys(opts.consents)){
                    if (opts.consents[k]){
                        let eventName = 'klaro-'+k+'-accepted'
                        dataLayer.push({'event': eventName})
                    }
                }
            \`,
            onInit: \`
                // initialization code here (will be executed only once per page-load)
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments)}
                gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'})
                gtag('set', 'ads_data_redaction', true)
            \`,
        },
         {
            // In GTM, you should define a custom event trigger named \`klaro-google-analytics-accepted\` which should trigger the Google Analytics integration.
            name: 'google-analytics',
            cookies: [
                /^_ga(_.*)?/ // we delete the Google Analytics cookies if the user declines its use
            ],
            purposes: ['marketing'],
            onAccept: \`
                // we grant analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                })
            \`,
            onDecline: \`
                // we deny analytics storage
                gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                })
            \`,
        }
    ],

    /*
    You can define an optional callback function that will be called each time the
    consent state for any given service changes. The consent value will be passed as
    the first parameter to the function (true=consented). The \`service\` config will
    be passed as the second parameter.
    */
    callback: function(consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    },

};
                `
                }}
            />


            <Script
                async={true}
                defer={true}
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                    console.log('analytics');
                     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `,
                }}
            />
        </>

    )
}