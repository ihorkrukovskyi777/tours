import {getHrefLocale} from "@/i18n/get-href-locale";
import i18n from "@/i18n";
import {PATH_GUIDES} from "@/shared/constants/route";

const getSchemaProduct = (item, date, locale, description = '') => {
    const url = getHrefLocale(locale, `${PATH_GUIDES}/${item.slug}`)
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "url": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`,
        "name": item.name,
        "description": `${item.description} ${description}`,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${item.attachment?.src}/public`,
        "brand": {
            "name": item.name,
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "EUR",
            'priceValidUntil': date,
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": item.rating?.rating || 5,
            "ratingCount": item.rating?.reviews || 0,
            "bestRating": "5",
            "worstRating": "0",
        },
    };
}

export default async function ProductSchemaGuide({slug, locale}) {
    await i18n.getFetchDefault();
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    const date = `${aYearFromNow.getFullYear()}-${aYearFromNow.getMonth()+1}-${aYearFromNow.getDate()}`
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/product-guide/${slug}`, {next: {revalidate: 60 * 60}})
    const item = await response.json();
    const schemaData = JSON.stringify(getSchemaProduct(item, date, locale, i18n.t('offers Free Walking Tours which has been selected and curated and by the Strawberry Tours team.')));
    return (
        <script
            async={true}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: schemaData}}
        />
    )

}