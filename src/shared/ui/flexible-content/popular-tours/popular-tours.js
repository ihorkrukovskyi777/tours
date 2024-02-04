import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchFlexibleContent} from "@/shared/api/flexible-content";

export default async function PopularTours({locale, id, index, flexibleKey}) {
    console.log(locale, 'locale')

    const data = await fetchFlexibleContent(id, locale, flexibleKey, index)
    if(!data?.tours) {
        return null;
    }
    return <RowTours tours={data.tours} title={data.title}></RowTours>
}
