import {headers} from "next/headers";

export default async function sitemap() {
    const headersList = headers()
    const referer = headersList.get('referer')

    console.log(referer)
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap`);
    siteMaps = await siteMaps.json();
    console.log(siteMaps, 'siteMaps')
    return [
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/cities/sitemap.xml`,
            lastModified: siteMaps.cityMod,
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/posts/sitemap.xml`,
            lastModified: siteMaps.postMod,
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/tours/sitemap.xml`,
            lastModified: siteMaps.tourMod,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/guides/sitemap.xml`,
            lastModified: new Date(),
            priority: 1,
        },
    ]
}