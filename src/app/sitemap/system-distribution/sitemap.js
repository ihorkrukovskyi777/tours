
export async function fetchIsActive() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/sitemap/${process.env.NEXT_PUBLIC_SYSTEM_HOSTING}/is-active`, {
            next: {
                revalidate: 0,
            }
        })
        const data = await response.json()
        return data
    } catch (err) {
        return { isActive: false, date: null}
    }
}

export async function fetchTours() {
    let siteMaps = await fetch(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/sitemap/${process.env.NEXT_PUBLIC_SYSTEM_HOSTING}`, {
        next: {
            revalidate: 0,
        }
    });
    const data = await siteMaps.json();
    return data;
}

export default async function sitemap() {
    const siteMaps = await fetchTours()
    const getSlug = (page) => {
        if (page.locale === 'en' && page.slug === '') {
            return '';
        }
        return page.locale === 'en' ? `/${page.slug}` : `/${page.locale}/${page.slug}`
    }

    if(!Array.isArray(siteMaps)) {
        return []
    }
    return siteMaps?.filter(page => page.published).map(page => ({
        url: `${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}${getSlug(page)}`,
        lastModified: page.dates?.published || new Date(),
    })) ?? []

}