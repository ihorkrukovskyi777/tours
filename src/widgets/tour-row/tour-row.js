import {getRandomTourByCity} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
import {createTranslation} from "@/i18n/server";
import {PATH_TOURS} from "@/shared/constants/route";
export default async function TourRow({id, locale = 'en', title , sizeSection='small'}) {
    const results = await getRandomTourByCity(id, locale)
    if (!Array.isArray(results)) {
        return null;
    }

    const tours = results.map(item => ({ ...item, slug: `${item.city.slug}/${PATH_TOURS}/${item.slug}` }));
    return <RowCities cities={tours} title={title} sizeSection={sizeSection}/>
}
