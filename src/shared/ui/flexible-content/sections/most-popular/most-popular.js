import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import RowCities from "@/shared/ui/row-cities/row-cities";
export default async function BannerHome({locale, id, index, flexibleKey}) {
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index)

    if(!data) {
        return null
    }
    return <RowCities cities={data.cities} title={data.title}/>
}
