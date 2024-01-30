import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import {createTranslation} from "@/i18n/server";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
export default async function BannerHome({locale, id, index, flexibleKey}) {
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index, 60*5)
    const { t } = await createTranslation();
    if(!data) {
        return null
    }

    const cities = data.cities.map(city => ({...city, title: `${ t('Free Tours')} ${city.title}` }))
    return <RowCities cities={cities} title={data.title}/>
}
