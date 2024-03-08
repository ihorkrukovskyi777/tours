import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";

export default async function PopularTours({locale, id, index, flexibleKey , size = 'small'}) {
    const i18n = await useDefaultI18n(locale);
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index)
    if(!data?.tours) {
        return null;
    }
    return (
        <RowTours
            tours={data.tours}
            title={data.title}
            sizeSection={size}
            i18n={{
                reviews: i18n.t('Reviews'),
                duration: i18n.t('Duration'),
                hours: i18n.t('Hours'),
                hour: i18n.t('Hour'),
                next_tour: i18n.t('Next Tour'),
                not_departure: i18n.t('No Departures Available. Check Soon!'),
                days: i18n.getDays(),
            }}
        />
    )
}
