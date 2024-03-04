import 'server-only'
import I18n from "@/i18n/service/i18n";
import { genitiveNS, } from "@/i18n/settings";
import {cache} from "react";

const serverContext = cache((locale) => {
    return new I18n(genitiveNS, locale);
})
export default async function useGenitiveI18n(locale) {
    const i18n = serverContext(locale);
    await i18n.getFetchDefault(locale);
    return {
        t: (key) => i18n.t(key, locale),
        tReplace: (key, value, locale) => i18n.tReplace(key, value, locale),
        getDays: i18n.getDays,
        getMonths: i18n.getMonths,
    };
}



