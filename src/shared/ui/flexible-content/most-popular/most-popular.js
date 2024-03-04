import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function MostPopular({locale, id, index, flexibleKey  , size = 'small'}) {

    const data = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*60)

    if(!data) {
        return null
    }

    const cities = data.cities.map(city => ({...city, title: `Free Tours ${city.title}` }))

    return (
        <>
            <RowCities locale={locale} cities={cities} title={data.title} sizeSection={size}/>
        </>
    )
}
