export const getTextAndSlides  = async (id, locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/tour/section/text-and-slider/${id}?locale=${locale}`,
            {next: {revalidate: 60}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }

}
