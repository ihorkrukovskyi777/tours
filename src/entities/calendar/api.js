// get api results
export const fetchDepartures = async (id, type = 'city', locale = 'en') => {
    try {
        let code = '';
        if(type === 'checkout') {
            code = `/${new URL(window.location.href).searchParams.get('code')}`
        }
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/departures/${type}/${id}${code}?locale=${locale}`,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const fetchBookingDepartures = async (body) => {

    const formData = new FormData();

    for ( const key in body ) {
        formData.append(key, body[key]);
    }
    const data =  await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/booking`, {
        method: 'POST',
        body: formData
    })

    return data.json();
}
