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
            source: ':slug/kostenpflichtige-touren',
        },
        {
            locale: 'es',
            source: ':slug/tours-pagados',
        },
        {
            locale: 'nl',
            source: ':slug/betaalde-rondleidingen'
        },
        {
            locale: 'fr',
            source: ':slug/visites-payantes'
        },
        {
            locale: 'pl',
            source: ':slug/płatne-wycieczki'
        },
        {
            locale: 'cat',
            source: ':slug/excursions-pagades'
        },
        {
            locale: 'it',
            source: ':slug/tour-a-pagamento'
        },

    ],
    getPathByLocale(locale) {
        return this.paths.find(item => item.locale === locale)?.source?.replace(':slug/', '') ?? '/'
    }
}