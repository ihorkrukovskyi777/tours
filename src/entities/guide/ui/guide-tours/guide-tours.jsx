import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchGuideTours} from "@/entities/guide/api";

export default async function GuideTours({id, locale, slug}) {

    let tours = await fetchGuideTours(id, locale);
    if (!tours?.length) {
        return null
    }
    tours = tours.map(item => ({...item, citySlug: slug}))
    return <RowTours tours={tours} title='Most Popular Tours'></RowTours>
}
