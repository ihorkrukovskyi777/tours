import {CivitatisRate} from "@entities/lib/calendar/@types";

export const fetchCategories = async (id: number, locale: string = 'en') => {
  const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/civitatis/categories/${id}?locale=${locale}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {revalidate: 0}
        }
    ).then(e => e.json())

    return data as CivitatisRate[]
}