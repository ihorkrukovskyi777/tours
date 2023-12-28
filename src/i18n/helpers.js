import { locales } from "@/i18n/settings";

export const getPathWithoutLocale = (pathname) => {
    return pathname?.split('/').filter(path => !!path).filter(path => !locales.includes(path));
}
