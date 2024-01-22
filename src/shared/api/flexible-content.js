export const fetchFlexibleContent = async (id, locale, key, index, revalidate = 0) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/flexible-content/${key}/${id}/${index}?locale=${locale}`,
                {next: {revalidate}}
            );
            return res.json()
        } catch (err) {
            console.log(err);
        }

}
