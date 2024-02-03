import {getCityBoxByTour} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
import {createTranslation} from "@/i18n/server";
export default async function CityRow({id, locale = 'en', title}) {
    const cities = await getCityBoxByTour(id, locale)
    const { t } = await createTranslation(locale);
    if (!Array.isArray(cities)) {
        return null;
    }

    return <RowCities  cities={cities} title={title}/>
}
