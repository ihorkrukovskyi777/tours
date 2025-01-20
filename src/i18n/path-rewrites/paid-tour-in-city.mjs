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
            source: 'bezahlte-touren-in-:slug',
        },

    ]
}