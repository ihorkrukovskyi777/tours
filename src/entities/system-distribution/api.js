
export async function getPageBySlug(host, slug, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/${host}/page/${slug}?locale=${locale}`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}

export async function getSystemPageRating(page_id) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${page_id}/banner`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}

export async function getSystemTourBox(page_id, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${page_id}/tours-box?locale=${locale}`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}

export async function getSystemPlaces(page_id, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${page_id}/places?locale=${locale}`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}

export async function getSystemReviews(id, locale, limit, offset = 0) {


    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${id}/reviews?locale=${locale}&limit=${limit}&offset=${offset}`,
        { next: { revalidate: 60 * 15, tags: ["section"] } }
    );
    return data.json();
}

export async function getSystemCities(id, locale) {


    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${id}/cities?locale=${locale}`,
        { next: { revalidate: 60 * 15, tags: ["section"] } }
    );
    return data.json();
}

export async function getSystemGuides(id, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${id}/sub-vendors?locale=${locale}`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}

export async function getSystemActiveLanguage(id, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${id}/active-language?locale=${locale}`,
        { next: { revalidate: 0 } }
    );
    return data.json();
}