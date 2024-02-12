import {fallbackLng} from "@/i18n/settings";
export default async function sitemap() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/tours`, {next: { revalidate: 60 * 60, tags: ['seo'] }});
    siteMaps = await siteMaps.json();

     return siteMaps.map(tour => {
         const slugLocale = tour.locale === fallbackLng  ? '' : `/${tour.locale}`
         return {
             url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${slugLocale}/${tour.city.slug}/tours/${tour.slug}`,
             lastModified: tour.lastModified,
             priority: 1,
         }
     })
}