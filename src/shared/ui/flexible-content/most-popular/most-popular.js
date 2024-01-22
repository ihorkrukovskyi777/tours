import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function BannerHome({locale, id, index, flexibleKey}) {
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*5)

    if(!data) {
        return null
    }
    return <RowCities cities={data.cities} title={data.title}/>
}
