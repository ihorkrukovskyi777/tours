import {PATH_TOURS} from "@/shared/constants/route";

const domain = process.env.NEXT_PUBLIC_CANONICAL_DOMAIN;
import {getHrefLocale} from "@/i18n/get-href-locale";
import Script from "next/script";

const getContext = (slug, index) => {
    return {

        "@context": "https://schema.org",
        "@type": "ListItem",
        "url": `${domain}${slug}`,
        "position": index + 1,
    }
}
const collectionPageSchema = (listUrl = [], tour) => {
    const url = getHrefLocale(tour.locale, `${tour.city.slug}/${PATH_TOURS}/${tour.slug}`)
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        description: '',
        url: '',
        name: 'Free Tours',
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${domain}${url}/#website`,
        },
        mainEntity: {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: listUrl.map((item, index) => getContext(getHrefLocale(item.locale, item.slug), index)),
            numberOfItems: listUrl?.length,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${domain}${url}#publisher`,
        },
        copyrightHolder: {
            '@type': 'Organization',
            '@id': `${domain}${url}#publisher`,
        },
        potentialAction: [
            {
                '@type': 'ReadAction',
                target: [`${domain}${url}`],
            },
        ],
        copyrightYear: new Date().getFullYear(),
    }
}

export default async function CollectionPageSchema({locale}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/collection-page?locale=${locale}`, {next: {revalidate: 60 * 60,  tags: ['schema']}})
    const data = await response.json();
    return <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(collectionPageSchema(data.cities, data.tour))}}
    />
}