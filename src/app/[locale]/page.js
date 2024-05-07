import {notFound} from "next/navigation";
import dynamic from "next/dynamic";
import {fallbackLng} from "@/i18n/settings";
import {generatorSeo} from "@/shared/helpers/seo/generator-seo";
import CollectionPageSchema from "@/shared/schema/collection-page";
import {headers} from "next/headers";
import {isMobileCheck} from "@/shared/helpers";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {seoLocales} from "@/shared/constants/locales-seo";
import {getHrefLocale} from "@/i18n/get-href-locale";
const ThanksReviewModal = dynamic(
    () => import("@/entities/add-review/ui/thanks-review-modal"),
    {ssr: false}
)
const FlexibleContent = dynamic(
    () => import("@/widgets/flexible-content"),
    {ssr: true}
)
export default async function Home({params: {locale}, ...props}) {
    const pageType = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/type/home?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    const data = await pageType.json();

    const headerList = headers()
    const isMobile = isMobileCheck(headerList.get("user-agent"));
    if (data.statusCode === 404 || typeof data.id !== 'number') {
        notFound();
    }
    const {languages} = data;
    const i18n = await useDefaultI18n(locale);

    const isAddReview = !!props.searchParams?.success_review_add
    return (
        <>
            {isAddReview ? <ThanksReviewModal message={i18n.t('review_confirmation_message')}/> : null}
            <CollectionPageSchema locale={locale}/>
            <FlexibleContent
                {...data}
                {...props}
                isMobile={isMobile}
                id={data.translateId}
                locale={locale}
                languages={languages.map(lang => ({...lang, slug: '',}))}
            />
        </>
    )
}

export async function generateMetadata({params: {slug, locale}}) {
    const seo = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/meta/page/type/home?locale=${locale}`, {next: {revalidate: 60 * 60,  tags: ['seo']}}).then((res) => res.json())
    const canonical = locale === fallbackLng ? slug : `${locale}`
    const languages = {}
    if (Array.isArray(seo.languages)) {
        for (const lang of seo.languages) {
            if (lang.locale === locale) {
                continue;
            }
            const slugLocale = lang.locale === 'en' ? '' : `/${lang.locale}`;
            languages[seoLocales[lang.locale] ?? 'en'] = [{
                title: lang.title,
                url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${slugLocale}`
            }]
            if(lang.locale === fallbackLng) {
                languages['x-default'] = [{title: lang.title, url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(lang.locale, lang.slug)}`}]
            }
        }
    }

    return generatorSeo(seo, canonical, locale, languages)
}