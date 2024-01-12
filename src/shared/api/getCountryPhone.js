// get api results
  export const getCountryPhone = async (locale = 'en') => {
    try {
        const res = await fetch(
            `http://localhost:9000/api/v1/phone?locale=${locale}`,

        );
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }

  }
