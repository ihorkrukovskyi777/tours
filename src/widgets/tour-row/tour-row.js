import {getRandomTourByCity} from "@/entities/api";
import RowCities from "@/shared/ui/card-components/row-cities/row-cities";
import {PATH_TOURS} from "@/shared/constants/route";
export default async function TourRow({id, locale = 'en', title , sizeSection='small', limit = 3}) {
    const results = await getRandomTourByCity(id, locale, limit)
    if (!Array.isArray(results)) {
        return null;
    }

    let tours = results.map(item => ({ ...item, slug: `${item.city.slug}/${PATH_TOURS}/${item.slug}` }));
    tours = tours.map(tour => ({...tour, reviews: tour?.rating?.reviews || 0 , rating: tour?.rating?.rating || 0}))
    return <RowCities locale={locale} cities={tours} title={title} sizeSection={sizeSection}/>
}

