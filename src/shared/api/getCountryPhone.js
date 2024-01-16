// get api results
export const getCountryPhone = async (locale = 'en') => {
    try {
        const res = await fetch(
            `http://localhost:9000/api/v1/phone?locale=${locale}`,
            {next: {revalidate: 60 * 60}}
        );
        return await res.json()
    } catch (err) {
        console.log(err);
    }

}
