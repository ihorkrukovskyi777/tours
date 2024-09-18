import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
import {getSystemCities} from "@/entities/system-distribution/api";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";

export default async function SystemCityRows({ id, flexible, locale}) {
    const cities = await getSystemCities(id, locale)
    if (!Array.isArray(cities)) {
        return null;
    }
    const { title } = getContentFlexibleTitle(flexible, locale)

    return <RowCities locale={locale} cities={cities.map(city => ({...city, title: `Free Tours ${city.title}`}))} title={title}/>
}