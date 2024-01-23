import {getHrefLocale} from "@/i18n/get-href-locale";
export const hrefSubVendor = (locale, brandName) => {
    return getHrefLocale(locale, `guide/${brandName?.replaceAll(' ', '_')}`);
}
