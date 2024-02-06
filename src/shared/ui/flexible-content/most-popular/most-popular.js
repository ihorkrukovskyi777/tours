import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
import i18n from "@/i18n";
export default async function BannerHome({locale, id, index, flexibleKey}) {
    await i18n.getFetchDefault();
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*5)

    if(!data) {
        return null
    }

    const cities = data.cities.map(city => ({...city, title: `Free Tours ${city.title}` }))

    return (
        <>
            <RowCities cities={cities} title={data.title}/>
        </>
    )
}
