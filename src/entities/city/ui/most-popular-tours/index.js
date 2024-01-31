import {picketToursBox} from "@/entities/api";
import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import TextQuote from "@/widgets/text-quote";
import ProviderMap from "@/widgets/map-and-slider/provider";
export default async function MostPopularTours({ id,locale,slug}) {
    let data = await picketToursBox(id, locale);
    if (!data.tours?.length) {
        return null;
    }
    const tours = data.tours.map((item) => ({...item, citySlug: slug}));
    const toursPlaces = tours.map(tour => ({ id: tour.id, title: tour.title, color: tour.color}));

    return (
        <>
            <RowTours tours={tours} title={data.title}></RowTours>
            <TextQuote id={id} locale={locale}/>
            <ProviderMap id={id} locale={locale} toursPlaces={toursPlaces} buttonsShow={true} />
        </>
    );
}
