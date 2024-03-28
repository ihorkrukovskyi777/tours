export async function getBannerData(id, locale, type = 'city', revalidate = 0) {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/banner/${id}?locale=${locale}`,
        {next: {revalidate, tags: ['section']}}
    )
    return data.json();
}

export async function getReviews(id, locale, limit, offset = 0, type = 'city') {

    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/reviews/${id}?locale=${locale}&limit=${limit}&offset=${offset}`,
        {next: {revalidate: 60 * 15, tags: ['section']}}
    )
    return data.json();
}

export async function getPickCities(id, locale = 'en') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/pick-cities/${id}?locale=${locale}`,
        {next: {revalidate: 60 * 15, tags: ['section']}}
    )
    return data.json();
}

export async function getCityBoxByTour(id, locale = 'en') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/section/city/${id}?locale=${locale}`,
        {next: {revalidate: 60}}
    )
    return data.json();
}

export async function getRandomTourByCity(id, locale = 'en') {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/section/random-tours/${id}?locale=${locale}`,
        {next: {revalidate: 5}}
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

export const getActiveLang = async (id, type = 'city', locale) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/active-language/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getTextQuote = async (id, locale = 'en', type = 'city') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/text-quote/${id}?locale=${locale}`,
            {next: {revalidate: 60 * 60, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getHighlightsImages = async (id) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/gallery-section/${id}`,
            {next: {revalidate: 60 * 60, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getTextsBlocks = async (id, locale = 'en', type = 'city') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/text-blocks/${id}?locale=${locale}`,
            {next: {revalidate: 60 * 60, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const getFaqBlock = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/section/faq/${id}?locale=${locale}`,
            {next: {revalidate: 60 * 60, tags: ['section']}}
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
            {next: {revalidate: 60 * 60, tags: ['phones']}}
        );
        const phones = await res.json()
        return phones
    } catch (err) {
        console.log(err);
    }
}

export const allCitiesData = async (locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/all?locale=${locale}`,
            {next: {revalidate: 60 * 10, tags: ['all-cities']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const allGuides = async (id, type = 'city', locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/sub-vendors/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}


export const blogPosts = async (locale) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/blog/last-posts?locale=${locale}`,
            {next: {revalidate: 60}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const singlePost = async (id) => {
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

export const searchCities = async (locale = 'en', search) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/city/search-city?locale=${locale}&q=${search}`,
            {next: {revalidate: 60 * 10, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const placesMarkers = async (id, locale = 'en', ids = []) => {
    try {

        const paramsIds = ids.length ? `&ids=${ids.join(',')}` : '';
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/place/pages/${id}?locale=${locale}${paramsIds}`,
            {next: {revalidate: 60 * 15, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export const placesMarkersCheckout = async (tourId, locale = 'en') => {
    try {
        console.log(`${process.env.NEXT_PUBLIC_NEST_API}/api/v1/place/by-tour/${tourId}?locale=${locale}`)
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/place/by-tour/${tourId}?locale=${locale}`,
            {next: {revalidate: 60 * 15, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}
export const getTextAndSlides = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/section/text-and-slider/${id}?locale=${locale}`,
            {next: {revalidate: 60 * 60, tags: ['section']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const canYouAddAReview = async (code, rating) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/review/${code}/${rating}`,
            {next: {revalidate: 0}}
        );
        if (res.status === 404) {
            return {status: 404}
        }
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const addReview = async (code, replay) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/review`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code,
                    replay,
                }),
                method: "POST",
                next: {revalidate: 0}
            }
        );
        if (res.status === 404) {
            return {status: 404}
        }
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const insertCode = async (id, type = 'city', locale) => {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/${type}/section/insert-code/${id}?locale=${locale}`,
        {next: {revalidate: 60 * 15, tags: ['section']}}
    )
    return data.text();
}
