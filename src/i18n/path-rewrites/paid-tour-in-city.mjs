const MAIN_PATH = 'paid-tours';
const MAIN_PATH_SLUG = '/en/paid-tours';
export const PAID_TOUR_IN_CITY = {
    path: MAIN_PATH,
    slug: MAIN_PATH_SLUG,
    paths: [
        {
            locale: 'en',
            source: 'paid-tours',
        },
        {
            locale: 'de',
            source: 'kostenpflichtige-touren',
        },
        {
            locale: 'es',
            source: 'tours-pagados',
        },
        {
            locale: 'nl',
            source: 'betaalde-rondleidingen'
        },
        {
            locale: 'fr',
            source: 'visites-payantes'
        },
        {
            locale: 'pl',
            source: 'płatne-wycieczki'
        },
        {
            locale: 'cat',
            source: 'excursions-pagades'
        },
        {
            locale: 'it',
            source: 'tour-a-pagamento'
        },

    ],
    getPathByLocale(locale) {
        return this.paths.find(item => item.locale === locale)?.source ?? '/'
    }
}