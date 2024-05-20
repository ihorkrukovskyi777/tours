import {fallbackLng} from "@/i18n/settings";
import {generatePages, LIMIT} from "@/shared/constants/sitemap";
export async function fetchTours() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/tours`, {next: { revalidate: 60 * 60, tags: ['seo'] }});
    return await siteMaps.json();
}
export async function generateSitemaps() {
    try {
        const total = await fetchTours();
        const sitemaps = generatePages(total.length);
        return sitemaps;
    } catch (error) {
        console.error("Error generating sitemaps: ", error);
        return [];
    }
}

export default async function sitemap({ id }) {
    let siteMaps = await fetchTours();
     return siteMaps.slice(id * LIMIT, LIMIT * (id + 1)).map(tour => {
         const slugLocale = tour.locale === fallbackLng  ? '' : `/${tour.locale}`
         return {
             url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${slugLocale}/${tour.city.slug}/tours/${tour.slug}`,
             lastModified: tour.lastModified,
             priority: 1,
         }
     })
}