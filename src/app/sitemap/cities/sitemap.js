import {generatePages, LIMIT} from "@/shared/constants/sitemap";

export async function fetchCities() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/cities`, {next: { revalidate: 0, tags: ['seo'] }});
    return await siteMaps.json();
}
export async function generateSitemaps() {
    try {
        const total = await fetchCities();
        const sitemaps = generatePages(total.length);
        return sitemaps;
    } catch (error) {
        console.error("Error generating sitemaps: ", error);
        return [];
    }
}
export default async function sitemap({ id }) {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/cities`, {next: { revalidate: 60 * 60, tags: ['seo'] }});
    siteMaps = await siteMaps.json();

    const getSlug = (page) => {

        if(page.slug === 'front-page') {
            return page.locale === 'en' ? `` : `${page.locale}`
        }
        return page.locale === 'en' ? `${page.slug}` : `${page.locale}/${page.slug}`
    }

    return siteMaps.slice(id * LIMIT, LIMIT * (id + 1)).map(page => ({
        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${getSlug(page)}`,
        lastModified: page.lastModified,
    }))
}