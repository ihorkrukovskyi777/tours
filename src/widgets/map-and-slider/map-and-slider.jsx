'use client';
import {createContext} from 'react';
import Button from './button/button';
import SliderTours from './slider-tours/slider-tours';
import Map from './map/map';
import {StoreMap} from './store/store-map';


export const StoreMapContext = createContext(null)

export default function MapAndSlider({id, ids, locale, toursPlaces}) {
    console.log(toursPlaces, 'ids')
    return (
        <section className='map_and_slider'>
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
                        <Map id={id} locale={locale}/>
                        <SliderTours/>
                    </StoreMapContext.Provider>

                </div>
            </div>
        </section>
    )
}
