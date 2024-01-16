// get api results
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
