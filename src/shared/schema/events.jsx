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
    if(!item?.departuresTimes?.length) {
        return null;
    }
    const firstDep = item?.departuresTimes[0] ?? null;


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
        offers: item?.departuresTimes?.filter(dep => new Date(dep.date).getTime() > new Date().getTime()).slice(0, 22)?.map(dep => getSchemaOffer(dep))
    }
}

export default async function EventsSchema({type = 'city', id, locale}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/events-${type}/${id}?locale=${locale}`, {next: {revalidate: 60*60, tags: ['schema']}})
    const data = await response.json();
    let schema = null;
    console.log(data, 'data')
    if(type === 'tour') {
        schema = getSchemaEvent(data)
    } else {
        schema = data?.map(item => getSchemaEvent(item))
    }
    return (
        <script
            async={true}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
    )
}