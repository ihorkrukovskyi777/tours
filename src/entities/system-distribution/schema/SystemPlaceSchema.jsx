import Script from "next/script";

const getSchemaPlace = (name, description, image) => {
    return {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": name,
        "description": description,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${image}/public`
    };
}

export default async function SystemPlaceSchema({seo, locale, image}) {
    const data = seo?.locales.find(item => item.locale === locale);
    if(!data) {
        return null
    }
    return <Script
        id="place-schema-system"
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(getSchemaPlace(data.title, data.description, image?.src))}}
    />
}