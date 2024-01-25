export const fetchSubVendorBySlug = async (slug) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/sub-vendor/${slug?.replaceAll(' ', '_')}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const fetchBannerSubVendor = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/sub-vendor/banner/${id}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const fetchGuideTours = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/sub-vendor/rows-tours/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const getPageLanguage = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/page/guide`,
            {next: {revalidate: 60}}
        );
        const data  = await res.json()
        return data?.languages ?? []
    } catch (err) {
        console.log(err);
    }
}
