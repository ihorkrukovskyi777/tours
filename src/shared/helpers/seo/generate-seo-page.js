import {getHrefLocale} from "@/i18n/get-href-locale";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/seo/generator-seo";
import {seoLocales} from "@/shared/constants/locales-seo";

export default async function generateSeoPage(slug, locale) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/${slug}?locale=${locale}`, {next: { revalidate: 60 * 60, tags: ['seo'] }}).then((res) => res.json())
    const languages = {};
    if(Array.isArray(seo.languages)) {
        for (const lang of seo.languages) {
            if(lang.locale === fallbackLng) {
                languages['x-default'] = [{ url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(lang.locale, lang.slug)}`}]
            }

            if(lang.locale === locale) {
                continue;
            }
            languages[seoLocales[lang.locale] ?? fallbackLng] = [{title: lang.title, url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(lang.locale, lang.slug)}`}]

        }
    }

    const canonical = locale === fallbackLng ? slug : `${locale}/${slug}`
    return generatorSeo(seo, canonical, locale, languages)
}