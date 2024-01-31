export const cancelBook = async (code, cancelMessage = null) => {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/cancel-booking`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                lang: 'en',
                cancelMessage: cancelMessage,
            }),
            next: {revalidate: 0}
        }
    )
    return data.json();
}

export const fetchEditBooking = async (body) => {

    try {

         await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/update-book`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return true;
    } catch (err) {
        return { success: false}
    }
}