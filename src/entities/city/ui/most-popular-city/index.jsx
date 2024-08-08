import {getPickCities} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function MostPopularCity({id, locale = 'en' ,size= 'small' , title}) {
    const data = await getPickCities(id, locale)
    if (!Array.isArray(data?.cities) || data?.cities.length === 0) {
        return null;
    }
    const cities = data.cities.map(city => ({...city, title: `Free Tours ${city.title}` }))
    return <RowCities locale={locale} cities={cities} title={title} sizeSection={size}/>
}
