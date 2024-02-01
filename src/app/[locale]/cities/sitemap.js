export default async function sitemap() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/seo/sitemap/cities`);
    siteMaps = await siteMaps.json();

    const getSlug = (page) => {

        if(page.slug === 'front-page') {
            return page.locale === 'en' ? `` : `${page.locale}`
        }
        return page.locale === 'en' ? `${page.slug}` : `${page.locale}/${page.slug}`
    }
    return siteMaps.map(page => ({
        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}/${getSlug(page)}`,
        lastModified: page.lastModified,
    }))
}