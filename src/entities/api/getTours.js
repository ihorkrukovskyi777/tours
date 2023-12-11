// get api results
export const getTours = (async (context) => {
    try {
        const res = await fetch(
            `http://dev.oneporttest.com/wp-json/tour/v1/en/city/en/london`,
            {
                method: 'GET',
            }
        );
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
    }
    
  })