export async function getBannerData(id, locale) {
    const data = await fetch(
        `http://localhost:9000/api/v1/city/section/banner/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function getReviews(id, locale, limit, offset = 0, type = 'city') {
    const data = await fetch(
        `http://localhost:9000/api/v1/${type}/reviews/${id}?locale=${locale}&limit=${limit}&offset=${offset}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function getPickCities(id, locale = 'en') {
    const data = await fetch(
        `http://localhost:9000/api/v1/city/section/pick-cities/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export async function picketCityPosts(id, locale = 'en') {

    const data = await fetch(
        `http://localhost:9000/api/v1/city/section/tours-box/${id}?locale=${locale}`,
        {next: {revalidate: 0}}
    )
    return data.json();
}

export const getActiveLang = async (id, type = 'city') => {
    try {
        const res = await fetch(
            `http://localhost:9000/api/v1/${type}/active-language/${id}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}
