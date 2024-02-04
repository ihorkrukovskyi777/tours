import {getHrefLocale} from "@/i18n/get-href-locale";

const getSchemaProduct = (item, date, locale) => {
    const url = getHrefLocale(locale, item.city?.slug)
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "url": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`,
        "name": item.name,
        "description": item.description,
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

export default async function ProductSchema({id, locale}) {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    const date = `${aYearFromNow.getFullYear()}-${aYearFromNow.getMonth()+1}-${aYearFromNow.getDate()}`
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/product-city/${id}?locale=${locale}`, {next: {revalidate: 60 * 60}})
    const city = await response.json();

    return <script async={true}
                   type="application/ld+json"
                   dangerouslySetInnerHTML={{__html: JSON.stringify(getSchemaProduct(city, date, locale))}}
    />
}