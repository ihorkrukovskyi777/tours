import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import {getSystemTourBox} from "@/entities/system-distribution/api";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import {getContentFlexibleTitle} from "@/entities/system-distribution/helpers";
export default async function SystemToursBox({ id, locale, flexible }) {
    const tours = await getSystemTourBox(id, locale)
    const i18n = await useDefaultI18n(locale);
    const { title } = getContentFlexibleTitle(flexible, locale)

    if(!tours?.length) {
        return null;
    }
    return (
        <RowTours
            tours={tours ?? []}
            title_first={''}
            title={title}
            sizeSection={'size'}
            i18n={{
                duration: i18n.t("Duration"),
                hours: i18n.t("Hours"),
                hour: i18n.t("Hour"),
                next_tour: i18n.t("Next Tour"),
                days: i18n.getDays(),
                not_departure: i18n.t("No Departures Available. Check Soon!"),
                reviews: i18n.t("Reviews"),
                months: i18n.getMonths(),
            }}
        />
    )
}