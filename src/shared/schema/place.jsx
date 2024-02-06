const getSchemaPlace = (name, description, image) => {
    return {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": name,
        "description": description,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${image}/public`
    };
}

export default async function PlaceSchema({id, locale}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/place/${id}?locale=${locale}`, {next: {revalidate: 60 * 60}})
    const place = await response.json();

    return <script async={true}
                   type="application/ld+json"
                   dangerouslySetInnerHTML={{__html: JSON.stringify(getSchemaPlace(place.name, place.description, place.attachment?.src))}}
    />
}