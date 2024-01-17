export async function getBannerData(id, locale) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/banner/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function getReviews(id, locale, limit, offset = 0, type = 'city') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/reviews/${id}?locale=${locale}&limit=${limit}&offset=${offset}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function getPickCities(id, locale = 'en') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/pick-cities/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function picketCityPosts(id, locale = 'en') {

    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/tours-box/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export const getActiveLang = async (id, type = 'city') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/active-language/${id}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getTextQuote  = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/text-quote/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getHighlightsImages  = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/gallery-section/${id}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getTextsBlocks  = async (id, locale ='en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/text-blocks/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getFaqBlock  = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/faq/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}


export const getCountryPhone = async (locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/phone?locale=${locale}`,
            {next: {revalidate: 60 * 60}}
        );
        return await res.json()
    } catch (err) {
        console.log(err);
    }

}
