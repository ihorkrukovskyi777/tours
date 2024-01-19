export const fetchFlexibleContent = async (id, locale, key, index) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/flexible-content/${key}/${id}/${index}?locale=${locale}`,
                {next: {revalidate: 0}}
            );
            return res.json()
        } catch (err) {
            console.log(err);
        }

}
