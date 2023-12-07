// get api results

export const GetCountryPhone = (id) => {
    return apiFetch({
        path: `http://dev.oneporttest.com/wp-json/oneport/v1/phone-code/en`,
        method: 'GET',
    })
}