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
