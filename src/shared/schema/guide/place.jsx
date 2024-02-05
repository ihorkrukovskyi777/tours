import i18n from "@/i18n";
const MESSAGE = 'offers Free Walking Tours which has been selected and curated and by the Strawberry Tours team.'
const getSchemaPlace = (name, description, image) => {
    return {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": name,
        "description": description,
        "image": `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${image}/public`
    };
}

export default async function PlaceGuideSchema({slug}) {
    await i18n.getFetch();
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/schema/place-guide/${slug}`, {next: {revalidate: 60 * 60}})
    const place = await response.json();
    const schema = getSchemaPlace(place.name, `${place.description} ${i18n.t(MESSAGE)}`, place.attachment?.src);
    return (
        <script
            async={true}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
    )
}