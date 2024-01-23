export async function getBannerData(id, locale, type = 'city', revalidate = 0, ) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/banner/${id}?locale=${locale}`,
        {next: {revalidate: revalidate}}
    )
    return data.json();
}

export async function getReviews(id, locale, limit, offset = 0, type = 'city') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/reviews/${id}?locale=${locale}&limit=${limit}&offset=${offset}`,
        {next: {revalidate: 60}}
    )
    return data.json();
}

export async function getPickCities(id, locale = 'en') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/pick-cities/${id}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    return data.json();
}

export async function picketToursBox(id, locale = 'en') {

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
            {next: {revalidate: 60}}
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
            {next: {revalidate: 60}}
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
            {next: {revalidate: 60}}
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
            {next: {revalidate: 60}}
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

export const allCitiesData  = async (locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/all?locale=${locale}`,
            {next: {revalidate: 60 * 10}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const allGuides = async (id, type ='city') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/sub-vendors/${id}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}


export const blogPosts = async (locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/blog/last-posts`,
            {next: {revalidate: 60}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const singlePost = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/blog/post/${id}`,
            {next: {revalidate: 60}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const searchCities = async (locale = 'en' , search) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/search-city?locale=${locale}&q=${search}`,
            {next: {revalidate: 60}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}



