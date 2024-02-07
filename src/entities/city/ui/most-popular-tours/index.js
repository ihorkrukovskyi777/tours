import {picketToursBox} from "@/entities/api";
import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import TextQuote from "@/widgets/text-quote";
import dynamic from "next/dynamic";
import i18n from "@/i18n";

const ProviderMap = dynamic(
    () => import("@/widgets/map-and-slider/provider"),
    {ssr: false}
)
export default async function MostPopularTours({id, locale, slug}) {
    let data = await picketToursBox(id, locale);
    await i18n.getFetchDefault();
    if (!data.tours?.length) {
        return null;
    }
    const tours = data.tours.map((item) => ({...item, citySlug: slug}));
    const toursPlaces = tours.map(tour => ({id: tour.id, title: tour.title, color: tour.color}));


    return (
        <>
            <RowTours
                tours={tours}
                title={data.title}
                i18n={{
                    duration: i18n.t('Duration'),
                    hours: i18n.t('Hours'),
                    hour: i18n.t('Hour'),
                    next_tour: i18n.t('Next Tour'),
                    days: i18n.getDays(),
                }}
            />

            <TextQuote id={id} locale={locale}/>
            <ProviderMap hideBottom={true} i18n={i18n.getMapSliders()} id={id} locale={locale} toursPlaces={toursPlaces} buttonsShow={true}/>
        </>
    );
}
