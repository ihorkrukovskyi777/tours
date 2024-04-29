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
    cookieDomain: '${process.env.NEXT_PUBLIC_COOKIE_BOT}',

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
        en: {
            consentModal: {
                title: 'We value your privacy',
                description: 'Here you can assess and customize the services that we’d like to use on this website. You’re in charge! Enable or disable services as you see fit. To learn more, please read our privacy policy.',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        es: {
            consentModal: {
                title: 'Valoramos tu privacidad',
                description: 'Aquí puedes valorar y personalizar los servicios que nos gustaría utilizar en este sitio web. ¡Tú mandas! Activa o desactiva los servicios como creas conveniente. Para saber más, lee nuestra',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        pt: {
            consentModal: {
                title: 'Valorizamos a sua privacidade',
                description: 'Aqui você pode avaliar e personalizar os serviços que gostaríamos de utilizar neste site. Você está no comando! Ative ou desative serviços conforme achar adequado. Para saber mais, por favor leia nossa Política de Privacidade. Para saber mais, leia nosso',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        de: {
            consentModal: {
                title: 'Wir legen Wert auf Ihre Privatsphäre',
                description: 'Hier können Sie die Dienste bewerten und anpassen, die wir auf dieser Website nutzen möchten. Du bist verantwortlich! Aktivieren oder deaktivieren Sie Dienste nach Belieben. Um mehr zu erfahren, lesen Sie bitte unsere Datenschutzrichtlinie. Um mehr zu erfahren, lesen Sie bitte unsere',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        fr: {
            consentModal: {
                title: 'Nous accordons une grande importance à votre vie privée',
                description: 'Ici, vous pouvez utiliser et personnaliser les services que nous vous proposons d’utiliser ce site. Vous n’êtes pas un commando ! Les services atifs ou désatifs sont conformes à ce qui est adéquat. Pour savoir plus, veuillez favoriser notre politique de confidentialité. Pour savoir plus, leia nosso Um more zu erfahren, lesen Sie bitte nous sommes',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        it: {
            consentModal: {
                title: 'Apprezziamo la tua privacy',
                description: 'Qui puoi usufruire e personalizzare i servizi che ci piacerebbe utilizzare in questo sito. Non sei al comando! Ative ou desative serviços conformi achar adequado. Per saber mais, por favor leia nossa Política de Privacidade. Para saber mais, leia nosso Um mehr zu erfahren, lesen Sie bitte unsere',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            acceptSelected: 'Configurar',
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        pl: {
            consentModal: {
                title: 'Cenimy Twoją prywatność',
                description: 'Tutaj możesz cieszyć się i dostosowywać usługi, z których chcielibyśmy korzystać na tej stronie. Nie ty tu rządzisz! Usługi aktywne lub nieaktywne są zgodne z odpowiednimi informacjami. Aby dowiedzieć się więcej, zapoznaj się z naszą Polityką Prywatności. Aby dowiedzieć się więcej, daj nam dowiedzieć się więcej na ten temat, daj nam znać',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            acceptSelected: 'Configurar',
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        ru: {
            consentModal: {
                title: 'Мы ценим вашу конфиденциальность',
                description: 'Здесь вы можете пользоваться и настраивать услуги, которые мы хотели бы использовать на этом сайте. Ты не главный! Активные или деактивированные услуги соответствуют адекватной информации. Чтобы узнать больше, прочтите нашу Политику конфиденциальности. Чтобы узнать больше, давайте узнаем больше об этом, дайте нам знать',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            privacyPolicy: {
                text: '{privacyPolicy}.',
                name: 'политика конфиденциальности',
            },
            purposeItem: {
                services: 'Эти службы обрабатывают личную информацию, чтобы показывать вам соответствующий контент о продуктах, услугах или темах, которые могут вас заинтересовать.',
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        cat: {
            consentModal: {
                title: 'Valorem la teva privadesa',
                description: 'Aquí podeu utilitzar i personalitzar els serveis que ens agradaria que utilitzeu en aquest lloc. No ets el responsable! Els serveis actius o desactivats corresponen a la informació adequada. Per obtenir més informació, llegiu la nostra Política de privadesa. Per saber-ne més, esbrinem-ne més, fes-nos-ho saber',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            privacyPolicy: {
                text: '{privacyPolicy}.',
                name: 'Política de privacitat',
            },
            acceptAll: 'Acceptar-ho tot',
            acceptSelected: 'Configurar',
            purposeItem: {
                services: 'Aquests serveis processen informació personal per mostrar-vos contingut rellevant sobre productes, serveis o temes que us poden interessar.',
            },
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
            },
        },
        nl: {
            consentModal: {
                title: 'Wij waarderen uw privacy',
                description: 'Hier kunt u de diensten die u op deze site wilt gebruiken, gebruiken en aanpassen. Jij bent niet de baas! Actieve of gedeactiveerde diensten komen overeen met adequate informatie. Lees ons privacybeleid voor meer informatie. Als u meer wilt weten, laten we er meer over weten, laat het ons weten',
                privacyPolicy: {
                    text: 'This is the text with a link to your {privacyPolicy}.',
                    name: 'privacy policy (the name)',
                },
            },
            privacyPolicy: {
                text: '{privacyPolicy}.',
                name: 'privacybeleid',
            },
            poweredBy: 'view config',
            ok: 'Wohoo!',
            acceptSelected: 'Configurar',
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
            },
            googleAnalytics: {
                description: 'Collection of visitor statistics',
            },
            mouseflow: {
                description: 'Real-time user analytics',
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
        },
        {
            name: 'google-ads',
            cookies: [],
            onAccept: \`
                // we grant ad storage and personalization
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                })
            \`,
            onDecline: \`
                // we decline ad storage and personalization
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                })
            \`,
            purposes: ['marketing'],
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