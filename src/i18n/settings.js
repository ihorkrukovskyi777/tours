
export const fallbackLng = 'en';
export const locales = [fallbackLng, 'fr', 'de', 'es', 'it', 'ru', 'pl', 'pt-pt', 'nl', 'cat'];
export const defaultNS = 'common';

export function getOptions(lang = fallbackLng, ns = defaultNS) {
    return {
        // debug: true, // Set to true to see console logs
        supportedLngs: locales,
        fallbackLng,
        lng: lang,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
