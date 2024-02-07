import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {fetchFlexibleContent} from "@/shared/api/flexible-content";
import i18n from "@/i18n/server-locales";

export default async function PopularTours({locale, id, index, flexibleKey}) {
    await i18n.getFetchDefault();
    const data = await fetchFlexibleContent(id, locale, flexibleKey, index)
    if(!data?.tours) {
        return null;
    }
    return (
        <RowTours
            tours={data.tours}
            title={data.title}
            i18n={{
                duration: i18n.t('Duration'),
                hours: i18n.t('Hours'),
                hour: i18n.t('Hour'),
                next_tour: i18n.t('Next Tour'),
                days: i18n.getDays(),
            }}
        />
    )
}
