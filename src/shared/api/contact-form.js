import {fallbackLng} from "@/i18n/settings";

export const fetchContactForm = async (id , body) => {
    const data = new FormData();

    for ( const key in body ) {
        data.append(key, body[key]);
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`, {
                method: "POST",
                body: data
            }
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}


export const fetchLocaleIdContactForm = async (id, locale = fallbackLng) => {

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/contact-form/${id}?locale=${locale}`, { next: {revalidate: 60 * 5}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}