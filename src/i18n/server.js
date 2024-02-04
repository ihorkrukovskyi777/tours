import i18n from "@/i18n/index";
export async function createTranslation(lang, ns) {
    return { t: (val) => i18n.t(lang,ns, val) }

}
