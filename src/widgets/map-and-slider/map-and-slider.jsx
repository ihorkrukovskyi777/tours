'use client';
import {createContext, useRef} from 'react';
import Button from './button/button';
import SliderTours from './slider-tours/slider-tours';
import Map from './map/map';
import {StoreMap} from './store/store-map';
import useOnScreen from "@/shared/hooks/useOnScreen";


export const StoreMapContext = createContext(null)

export default function MapAndSlider({id, ids, locale, toursPlaces}) {
    const ref= useRef(null)
    const isVisible = useOnScreen(ref)

    return (
        <section className='map_and_slider' ref={ref}>
            <div className="container">
                <h2>Tour Features</h2>
                <div className='map_block'>
                    {toursPlaces?.length &&
                        <div className="buttons-map">
                            {toursPlaces.map((tour, index) => {
                                return <Button key={index} color={tour.color}>{tour.title}</Button>
                            })}
                        </div>
                    }
                    <StoreMapContext.Provider value={{
                        map: new StoreMap(id, locale)
                    }}>
                        {isVisible ? <Map id={id} locale={locale}/> : null}
                        {isVisible ? <SliderTours/> : null}
                    </StoreMapContext.Provider>

                </div>
            </div>
        </section>
    )
}
