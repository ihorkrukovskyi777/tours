export const fetchFooterMenu = async (locale = 'en') => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/menu/footer?locale=${locale}`,
            {next: {revalidate: 60 * 60 , tags: ['footer-menu']}}
        );
        return res.json()
    } catch (err) {
        console.log(err);
    }
}
