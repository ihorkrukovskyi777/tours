const MAIN_PATH = 'paid-tours';
const MAIN_PATH_SLUG = '/en/:slug/paid-tours';
export const PAID_TOUR_IN_CITY = {
    path: MAIN_PATH,
    slug: MAIN_PATH_SLUG,
    paths: [
        {
            locale: 'en',
            source: ':slug/paid-tours',
        },
        {
            locale: 'de',
            source: ':slug/kostenpflichtige-tours',
        },
        {
            locale: 'es',
            source: ':slug/tours-de-pago',
        },
        {
            locale: 'nl',
            source: ':slug/betaalde-tours'
        },
        {
            locale: 'fr',
            source: ':slug/tours-payants'
        },
        {
            locale: 'pl',
            source: ':slug/płatne-tours'
        },
        {
            locale: 'cat',
            source: ':slug/tours-de-pagament'
        },
        {
            locale: 'it',
            source: ':slug/tours-a-pagamento'
        },
        {
            locale: 'pt-pt',
            source: ':slug/tours-pagos'
        },

    ],
    getPathByLocale(locale) {
        return this.paths.find(item => item.locale === locale)?.source?.replace(':slug/', '') ?? '/'
    }
}