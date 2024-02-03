const webSiteSchemaJsonb = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://strawberrytours.com/',
    'author': {
        '@type': 'Organization',
        'name': 'Strawberry Tours',
        'alternateName': ['FreeTours', 'FreeTours.com'],
        'sameAs': [
            'https://www.facebook.com/StrawberryToursENG',
            'https://twitter.com/StrawberryTours',
            'https://www.instagram.com/strawberrytours/',
        ],
        'logo': {
            '@type': 'ImageObject',
            'url': 'https://strawberrytours.com/wp-content/uploads/2022/05/tour-logo.svg',
            'caption': 'Strawberry Tours',
        },
        'foundingDate': '2016-01-01',
    },
}

export default function WebSiteSchema() {
    return <script
        async={true}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchemaJsonb) }}
    />
}