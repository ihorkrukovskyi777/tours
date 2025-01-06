// get api results
import { serialize } from 'object-to-formdata';

export const fetchDepartures = async (id, type = 'city', locale = 'en') => {
    try {
        let code = '';
        if(type === 'checkout') {
            code = `/${new URL(window.location.href).searchParams.get('code')}`
        }
        let url = `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/departures/${type}/${id}${code}?locale=${locale}`
        if(type === 'system') {
            url = `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/system-distribution/external-api/section/${id}/calendar?locale=${locale}`
        }
        const res = await fetch(
            url,
            {next: {revalidate: 0}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}

export const fetchBookingDepartures = async (body) => {

    const formData = serialize(body, { indices: true})


    const data =  await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/booking`, {
        method: 'POST',
        body: formData
    })

    return data.json();
}
