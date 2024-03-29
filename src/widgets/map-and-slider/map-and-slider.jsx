'use client';
import {createContext, useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
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
const UseCtrl = dynamic(
    () => import("@/shared/ui/map/use-ctrl/use-ctrl"),
    {ssr: false}
)
export const StoreMapContext = createContext(null)

export default observer(function MapAndSlider({i18n, id, locale, places = [], toursPlaces, hideBottom, children, selectedTourDefault = null}) {
    const store = useRef(new StoreMap(id, locale))
    const ids = toursPlaces?.map(item => item.id) ?? []

    useEffect(() => {
        store.current.setMarkers(places, selectedTourDefault)
    }, [])
    return (
        <StoreMapContext.Provider value={{
            map: store.current
        }}>
            {store.current.places?.length ?
               <>
                   <section className='map_and_slider'>
                       <div className="container">
                           <h2>{i18n.tour_features}</h2>
                           <div className='map_block'>
                               {ids.length ? <ButtonTours i18n={i18n} toursPlaces={toursPlaces}></ButtonTours> : null}
                               <div className="wrap-map">
                                   <UseCtrl i18n={{use_ctrl: i18n.use_ctrl}}/>
                                   <Map ids={ids} id={id} locale={locale}/>
                               </div>
                               <SliderTours i18n={i18n} hideBottom={hideBottom}/>
                           </div>
                       </div>
                   </section>
                   {children}
               </>
                : null}
        </StoreMapContext.Provider>
    )
})
