'use client';
import {createContext} from 'react';
import ButtonTours from '@/widgets/map-and-slider/button/button-tours';
import {StoreMap} from '@/widgets/map-and-slider/store/store-map';
import dynamic from "next/dynamic";
import './style.css';

const Map = dynamic(
    () => import("@/widgets/map-and-slider/map/map"),
    {ssr: false}
)
const SliderTours = dynamic(
    () => import("@/widgets/map-and-slider/slider-tours/slider-tours"),
    {ssr: false}
)

export const StoreMapContext = createContext(null)

export default function MapAndSlider({i18n, id, locale, toursPlaces}) {

    const ids = toursPlaces?.map(item => item.id) ?? []

    return (
        <section className='map_and_slider'>
            <div className="container">
                <h2>{i18n.tour_features}</h2>
                <div className='map_block'>
                    <StoreMapContext.Provider value={{
                        map: new StoreMap(id, locale)
                    }}>
                        { ids.length ? <ButtonTours i18n={i18n} toursPlaces={toursPlaces}></ButtonTours> : null }
                        <Map ids={ids} id={id} locale={locale}/>
                        <SliderTours i18n={i18n}/>
                    </StoreMapContext.Provider>
                </div>
            </div>
        </section>
    )
}
