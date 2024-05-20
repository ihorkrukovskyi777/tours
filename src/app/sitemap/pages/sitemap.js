import {generatePages, LIMIT} from "@/shared/constants/sitemap";
import {fetchTours} from "@/app/sitemap/tours/sitemap";

export async function fetchPages() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/sub-vendors`, {next: { revalidate: 60 * 60, tags: ['seo'] }});
    return siteMaps.json();
}

export async function generateSitemaps() {
    try {
        const total = await fetchPages();
        const sitemaps = generatePages(total.length);
        return sitemaps;
    } catch (error) {
        console.error("Error generating sitemaps: ", error);
        return [];
    }
}

export default async function sitemap({ id }) {
    let siteMaps = await fetchPages();


    const getSlug = (page) => {
        if(page.locale === 'en' && page.slug === '') {
            return '';
        }
        return page.locale === 'en' ? `/${page.slug}` : `/${page.locale}/${page.slug}`
    }
    return siteMaps.slice(id * LIMIT, LIMIT * (id + 1)).map(page => ({
        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getSlug(page)}`,
        lastModified: page.lastModified,
    }))
}