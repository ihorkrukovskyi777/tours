const MAIN_PATH = 'paid-tours-in';
const MAIN_PATH_SLUG = '/en/paid-tours-in/:slug';
export const PAID_TOUR_IN_CITY = {
    path: MAIN_PATH,
    slug: MAIN_PATH_SLUG,
    paths: [
        {
            locale: 'en',
            source: 'paid-tours-in-:slug',
        },
        {
            locale: 'de',
            source: 'kostenpflichtige-touren-in-:slug',
        },
        {
            locale: 'es',
            source: 'tours-pagados-en-:slug',
        },
        {
            locale: 'nl',
            source: 'betaalde-rondleidingen-in:slug'
        },
        {
            locale: 'fr',
            source: 'visites-payantes-à:slug'
        },
        {
            locale: 'pl',
            source: 'płatne-wycieczki-po:slug'
        },
        {
            locale: 'cat',
            source: 'visites-de-pagament-a:slug'
        },
        {
            locale: 'it',
            source: 'tour-a-pagamento-a:slug'
        },

    ],
    getPathByLocale(locale, slug) {
        return this.paths.find(item => item.locale === locale)?.source?.replace(':slug', slug) ?? '/'
    }
}