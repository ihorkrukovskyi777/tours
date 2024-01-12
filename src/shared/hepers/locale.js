export const localeFormat = (locale) => {
    switch (locale.toLowerCase()) {
        case 'pt-pt':
            return 'pt';
        default:
            return locale
    }
}
