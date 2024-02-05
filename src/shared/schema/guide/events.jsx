import {getHrefLocale} from "@/i18n/get-href-locale";

const getSchemaOffer = (offer) => {
    const url = `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getHrefLocale(offer.tour?.locale, `${offer.tour.city?.slug}/${offer.tour.slug}`)}`
    return {
        '@type': 'Offer',
        'price': '0',
        'url': url,
        'priceCurrency': 'EUR',
        'category': offer.tour.city?.title,
        'availabilityStarts': offer.date,
        'validFrom': offer.date,
        'availability': 'https://schema.org/InStock',
        'priceValidUntil': offer.date,
        'inventoryLevel': {
            '@type': 'QuantitativeValue',
            'value': '999'
        }
    }
}

const getSchemaEvent = (item) => {

    const firstDep = Array.isArray(item?.values) ?  item?.values[0] : '';


    return {
        '@context': "https://schema.org",
        '@type': "Event",
        name: item.seoName,
        eventStatus: "https://schema.org/EventScheduled",
        startDate: firstDep ? firstDep.date : '',
        description: item.description,
        image: `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${item.attachment?.src}/public`,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        aggregateRating: {
            '@type': "AggregateRating",
            ratingValue: item.rating?.rating || 5,
            ratingCount: item.rating?.reviews || 0,
            reviewCount: item.rating?.reviews || 0,
            bestRating: "5",
            worstRating: "0"
        },
        location: {
            '@type': "Place",
            name: item.city.title,
            description: "",
            address: {
                '@type': "PostalAddress",
                addressLocality: item.city.title,
                addressRegion: item.city.title,
                addressCountry: {
                    '@type': "Country",
                    name: item.country
                }
            }
        },
        performer: {
            '@type': "Organization",
            name: "Strawberry Tours"
        },
        organizer: {
            '@type': "Organization",
            name: "Strawberry Tours",
            url: process.env.NEXT_PUBLIC_CANONICAL_DOMAIN
        },
        offers: item?.values?.filter(dep => new Date(dep.date).getTime() > new Date().getTime()).slice(0, 22)?.map(dep => getSchemaOffer(dep))
    }
}

export default async function EventsGuideSchema({slug, locale}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/events-guide/${slug}?locale=${locale}`, {next: {revalidate: 0}})
    const data = await response.json();
    const schemas = data.map(item => getSchemaEvent(item))
    return (
        <script
            async={true}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schemas)}}
        />
    )
}