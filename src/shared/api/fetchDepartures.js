// get api results
export const fetchDepartures = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `http://localhost:9000/api/v1/tours/departures/city/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}
