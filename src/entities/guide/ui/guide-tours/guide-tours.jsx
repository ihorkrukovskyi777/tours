import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchGuideTours} from "@/entities/guide/api";
import i18n from "@/i18n";

export default async function GuideTours({id, locale, slug}) {
    await i18n.getFetchDefault()
    let tours = await fetchGuideTours(id, locale);
    if (!tours?.length) {
        return null
    }

    tours = tours.map(item => ({...item, citySlug: slug}))
    return <RowTours
        tours={tours}
        title={i18n.t('Most Popular Tours')}
        i18n={{
            duration: i18n.t('Duration'),
            hours: i18n.t('Hours'),
            next_tour: i18n.t('Next Tour'),
        }}></RowTours>
}
