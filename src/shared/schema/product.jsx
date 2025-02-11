import {getHrefLocale} from "@/i18n/get-href-locale";
import Script from "next/script";
import {fallbackLng} from "@/i18n/settings";

const getSchemaProductCity = (item, date, locale, eventsTotal, reviews) => {
    const url = getHrefLocale(locale, item.slug)
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "url": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`,
        "name": item.name,
        "description": item.description,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${item.attachment?.src}/public`,
        "offers": {
            "@type": "AggregateOffer",
            "price": "0",
            "lowPrice": "0",
            "highPrice": "0",
            "priceCurrency": "EUR",
            'priceValidUntil': date,
            "offerCount": eventsTotal
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": Number(item.rating?.rating) || 5,
            "reviewCount": Number(item.rating?.reviews) || 1,
            "bestRating": "5",
            "worstRating": "0",
        },
        "review": reviews?.map(item => {
            return  {
                "@type": "Review",
                "author": item.author,
                "datePublished": item.date,
                "reviewBody": item.message,
                "name": "Not a happy camper",
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": item.rating,
                    "worstRating": "0"
                }
            };
        })
    };
}

const getSchemaProductTour = (item, date, locale, reviews) => {
    const slug = getHrefLocale(locale, item?.slug)
    const url = `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${slug}`;
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
            "url": url,
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": Number(item.rating?.rating) || 5,
            "reviewCount": Number(item.rating?.reviews) || 1,
            "bestRating": "5",
            "worstRating": "0",
        },
        "review": reviews?.map(item => {
            return  {
                "@type": "Review",
                "author": item.author,
                "datePublished": item.date,
                "reviewBody": item.message,
                "name": item.author,
                "reviewRating": {
                    "@type": "Rating",
                    "bestRating": "5",
                    "ratingValue": item.rating,
                    "worstRating": "0"
                }
            };
        })
    };
}
const getSchemaBreadcrumbList = (item, locale) => {
    const url = getHrefLocale(locale, item?.slug)
    const homeLink = locale === fallbackLng ? process.env.NEXT_PUBLIC_CANONICAL_DOMAIN : `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${locale}`
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement":
            [
                {
                    "@type": "ListItem",
                    "position": 1,
                    // "name": item?.homePage?.title ?? "Free walking tours",
                    "name": "Home",
                    "item": homeLink
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": item?.city?.title ?? '',
                    "item": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${item?.city?.slug}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": item.title,
                    "item": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`
                }
            ]
    }
}


const getSchemaCityBreadcrumbList = (item, locale) => {
    const url = getHrefLocale(locale, item.slug)
    const homeLink = locale === fallbackLng ? process.env.NEXT_PUBLIC_CANONICAL_DOMAIN : `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${locale}`
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement":
            [
                {
                    "@type": "ListItem",
                    "position": 1,
                    // "name": item?.homePage?.title ?? "Free walking tours",
                    "name": "Home",
                    "item": homeLink
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": item.name,
                    "item": `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${url}`
                },
            ]
    }
}
export default async function ProductSchema({id, locale, type = 'city'}) {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    const date = `${aYearFromNow.getFullYear()}-${aYearFromNow.getMonth() + 1}-${aYearFromNow.getDate()}`
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/product-${type}/${id}?locale=${locale}`, {
        next: {
            revalidate: 0,
            tags: ['schema']
        }
    })
    const {product, eventsTotal, reviews} = await response.json();


    const schemaData = type === 'tour' ? JSON.stringify(getSchemaProductTour(product, date, locale, reviews)) : JSON.stringify(getSchemaProductCity(product, date, locale, eventsTotal, reviews));

    return (
        <>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: schemaData}}
            />
            {type === 'tour' ? <Script
                    id="product-schema-breadcrumb-list"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(getSchemaBreadcrumbList(product, locale))}}
                />
                : null}
            {type === 'city' ? <Script
                    id="product-schema-breadcrumb-list-city"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(getSchemaCityBreadcrumbList(product, locale))}}
                />
                : null}
        </>
    )

}