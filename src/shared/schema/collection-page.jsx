const domain = process.env.NEXT_PUBLIC_CANONICAL_DOMAIN;

const getContext = (slug, index) => {
    return {

        "@context": "https://schema.org",
        "@type": "ListItem",
        "url": `${domain}/${slug}`,
        "position" :index+1,
    }
}
const collectionPageSchema = (listUrl) => {

    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        description: '',
        url: '',
        name: 'Free Tours',
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${domain}/#website`,
        },
        mainEntity: {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: listUrl.map(item => getContext(item)),
            numberOfItems: listUrl?.length,
        },
        publisher: {
            '@type': 'Organization',
            ' @id': '',
        },
        copyrightHolder: {
            '@type': 'Organization',
            '@id': `${domain}#publisher`,
        },
        potentialAction: [
            {
                '@type': 'ReadAction',
                target: [`${domain}/`],
            },
        ],
        copyrightYear: new Date().getFullYear(),
    }
}

export default async function CollectionPageSchema() {
    return <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema()) }}
    />
}