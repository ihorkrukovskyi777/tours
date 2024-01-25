'use client';
import { createContext } from 'react';
import Button from './button/button';
import SliderTours from './slider-tours/slider-tours';
import Map from './map/map';
import { StoreMap } from './store/store-map';


import './style.css';


export const StoreMapContext = createContext(null)

export default  function MapAndSlider({id , locale , buttonsShow = false}) {

    const buttons = [ 'Free Jack the Ripper' , 'Free ipper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' ,'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London '];


    return (
        <section className='map_and_slider'>
            <div className="container">
                <h2>Tour Features</h2>
                <div className='map_block'>
                    {buttonsShow &&
                        <div className="buttons-map" >
                            {buttons.map((item , index) => <Button key={index}>{item}</Button>)}
                        </div>
                    }
                    <StoreMapContext.Provider value={{
                        map: new StoreMap(id , locale)
                    }}>
                        <Map id={id} locale={locale} />
                        <SliderTours />
                    </StoreMapContext.Provider>

                </div>
            </div>
        </section>
  )
}