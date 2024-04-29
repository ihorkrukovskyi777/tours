import {getHrefLocale} from "@/i18n/get-href-locale";
import Script from "next/script";

const getSchemaProduct = (item, date, locale) => {
    const url = getHrefLocale(locale, item.slug)
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "url": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`,
        "name": item.name,
        "description": item.description,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${item.attachment?.src}/public`,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            'priceValidUntil': date,
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": item.rating?.rating || 5,
            "reviewCount": item.rating?.reviews || 1,
            "bestRating": "5",
            "worstRating": "0",
        },
    };
}

export default async function ProductSchema({id, locale, type = 'city'}) {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    const date = `${aYearFromNow.getFullYear()}-${aYearFromNow.getMonth()+1}-${aYearFromNow.getDate()}`
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/product-${type}/${id}?locale=${locale}`, {next: {revalidate: 60 * 60,  tags: ['schema']}})
    const item = await response.json();
    const schemaData = JSON.stringify(getSchemaProduct(item, date, locale));
    return (
        <Script
            id="product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: schemaData}}
        />
        )

}