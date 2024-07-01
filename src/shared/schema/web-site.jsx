import Script from "next/script";

const webSiteSchemaJsonb = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://strawberrytours.com/',
    'author': {
        '@type': 'Organization',
        'name': 'Strawberry Tours',
        'alternateName': ['StrawberryTours', 'StrawberryTours.com'],
        'sameAs': [
            'https://www.facebook.com/StrawberryToursENG',
            'https://twitter.com/StrawberryTours',
            'https://www.instagram.com/strawberrytours/',
            'https://www.linkedin.com/company/strawberry-tours/',
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
    return <Script
        id="web-site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchemaJsonb) }}
    />
}