import {picketToursBox, placesMarkers} from "@/entities/api";
import RowTours from "@/shared/ui/card-components/row-tours/row-tours";
import dynamic from "next/dynamic";
import useDefaultI18n from "@/i18n/hooks/useDefaultI18n";
import TextSection from "@/entities/city/ui/text-section";
import {fallbackLng} from "@/i18n/settings";

const ProviderMap = dynamic(() => import("@/widgets/map-and-slider/provider"), {
    ssr: false,
});
export default async function MostPopularTours({
                                                   id,
                                                   locale,
                                                   slug,
                                                   title = "",
                                                   size = "small",
                                                   textSectionData = {},
                                                   titleTextSection = '',
                                                   isMobile = false
                                               }) {
    let data = await picketToursBox(id, locale);
    const i18n = await useDefaultI18n(locale);
    if (!Array.isArray(data.tours)) {
        return null;
    }

    const tours = data.tours.map((item) => ({...item, citySlug: slug}));
    const toursPlaces = tours.map((tour) => ({
        id: tour.id,
        title: tour.title,
        color: tour.color,
    }));
    const places = await placesMarkers(
        id,
        locale,
        tours?.map((tour) => tour.id)
    );


    const titleWalkingTours = locale === fallbackLng ? title + ' ' + i18n.t("Walking Tours Highlights") : i18n.t("Walking Tours Highlights") + ' ' + title

    return (
        <>
            {tours?.length ? (
                <>
                    <RowTours
                        tours={tours}
                        title_first={i18n.t("Best Free Walking Tours in")}
                        title={`${title}`}
                        sizeSection={size}
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
                    <TextSection data={textSectionData[0] ?? ''}/>
                </>
            ) : <>

                    <TextSection titleSection={titleTextSection} showTitle={true} data={textSectionData[0] ?? ''}/>
                </>

            }



            <ProviderMap
                hideBottom={true}
                i18n={{...i18n.getMapSliders(), tour_features: titleWalkingTours}}
                id={id}
                locale={locale}
                places={places}
                toursPlaces={toursPlaces}
                buttonsShow={true}
                isMobile={isMobile}

            />
            <TextSection titleSection={titleWalkingTours} showTitle={!places.length} data={textSectionData[1] ?? ''}/>
        </>
    );
}
