import {getCityBoxByTour} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function CityRow({id, locale = 'en', title}) {
    const cities = await getCityBoxByTour(id, locale)
    if (!Array.isArray(cities)) {
        return null;
    }

    console.log(cities, 'cities')
    return <RowCities  cities={cities.map(city => ({...city, title: `Free Tours ${city.title}`}))} title={title}/>
}
