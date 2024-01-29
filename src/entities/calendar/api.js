// get api results
export const fetchDepartures = async (id, type = 'city', locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/departures/${type}/${id}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const fetchBookingDepartures = async (body) => {

    const data =  await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/booking`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body)
    })
    return data.json();
}
