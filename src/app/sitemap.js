
export default async function sitemap() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap`);
    siteMaps = await siteMaps.json();
    return [
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/cities/sitemap.xml`,
            lastModified: siteMaps.cityMod,
            priority: 0.9,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/posts/sitemap.xml`,
            lastModified: siteMaps.postMod,
            priority: 0.2,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/tours/sitemap.xml`,
            lastModified: siteMaps.tourMod,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/guides/sitemap.xml`,
            lastModified: siteMaps.guideMod,
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/pages/sitemap.xml`,
            lastModified: siteMaps.guideMod,
            priority: 0.8,
        },
    ]
}