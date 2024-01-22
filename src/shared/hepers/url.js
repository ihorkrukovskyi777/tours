import {getHrefLocale} from "@/i18n/get-href-locale";
export const hrefSubVendor = (locale, name) => `/guide/${getHrefLocale(locale, name?.replaceAll(' ', '_'))}`
