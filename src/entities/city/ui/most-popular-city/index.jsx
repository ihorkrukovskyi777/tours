import {getPickCities} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function MostPopularCity({id, locale = 'en'}) {
    const data = await getPickCities(id, locale)

    if (!Array.isArray(data?.cities)) {
        return null;
    }

    return <RowCities  cities={data?.cities} title={data?.title}/>
}
