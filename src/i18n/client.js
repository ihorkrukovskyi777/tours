'use client';
import i18n from "@/i18n/index";
import {defaultNS, fallbackLng} from "@/i18n/settings";
export function useTranslation(lng = fallbackLng, ns = defaultNS) {
    return { t: (val) => i18n.t(lng,ns, val)}

}


