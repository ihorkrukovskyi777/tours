import {fetchTours} from "@/app/sitemap/tours/sitemap";
import {generatePages} from "@/shared/constants/sitemap";
import {fetchCities} from "@/app/sitemap/cities/sitemap";
import {fetchGuides} from "@/app/sitemap/guides/sitemap";
import {fetchPages} from "@/app/sitemap/pages/sitemap";
import {fetchPosts} from "@/app/sitemap/posts/sitemap";
import {fetchIsActive} from "@/app/sitemap/system-distribution/sitemap";

export const revalidate = 40;
export default async function sitemap() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap`, {next: { revalidate: 60 * 60, tags: ['seo'] }});
    siteMaps = await siteMaps.json();


    const [tours, cities, guides, pages, posts, systemData] = await Promise.all([
        fetchTours(),
        fetchCities(),
        fetchGuides(),
        fetchPages(),
        fetchPosts(),
        fetchIsActive(),
    ])
    const sitemapsTours = generatePages(tours.length);
    const sitemapsCities = generatePages(cities.length);
    const sitemapsGuides = generatePages(guides.length);
    const sitemapsPages = generatePages(pages.length);
    const sitemapsPosts = generatePages(posts.length);


    const system = systemData.isActive ? [{
        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/system-distribution/sitemap.xml`,
        lastModified: systemData.date,
        priority: 0.9,
    }] : []
    return [
        ...sitemapsPosts.map(({id}) => ({
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/posts/sitemap/${id}.xml`,
            lastModified: siteMaps.postMod,
            priority: 0.2,
        })),
        ...sitemapsPages.map(({id}) => ({
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/pages/sitemap/${id}.xml`,
            lastModified: new Date().getTime(),
            priority: 0.8,
        })),
        ...sitemapsGuides.map(({id}) => ({
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/guides/sitemap/${id}.xml`,
            lastModified: siteMaps.guideMod,
            priority: 0.8,
        })),
        ...sitemapsTours.map(({id}) => ({
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/tours/sitemap/${id}.xml`,
            lastModified: siteMaps.tourMod,
            priority: 1,
        })),
        ...sitemapsCities.map(({id}) => ({
            url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/sitemap/cities/sitemap/${id}.xml`,
            lastModified: siteMaps.cityMod,
            priority: 0.9,
        })),
        ...system,
    ]
}