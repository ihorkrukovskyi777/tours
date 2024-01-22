export const getHrefLocale = (locale = 'en', slug = '') => {
    const sub = locale === 'en' ? '' : `/${locale}`
    return `${sub}/${slug}`
}
