import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchGuideTours} from "@/entities/guide/api";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

export default async function GuideTours({id, locale, slug, brandName = ''}) {
    const i18n = await useDefaultI18n(locale);
    let tours = await fetchGuideTours(id, locale);
    if (!tours?.length) {
        return null
    }

    tours = tours.map(item => ({...item, citySlug: slug}))
    return <RowTours
        tours={tours}
        title={i18n.t('Tours That %s Leads').replace('%s', brandName)}
        i18n={{
            duration: i18n.t('Duration'),
            hours: i18n.t('Hours'),
            hour: i18n.t('Hour'),
            next_tour: i18n.t('Next Tour'),
            days: i18n.getDays(),
            not_departure: i18n.t('No Departures Available. Check Soon!'),
            reviews: i18n.t('Reviews'),
            months: i18n.getMonths(),
        }} />
}
