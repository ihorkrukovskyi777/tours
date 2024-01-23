'use client';
import Button from './button/button';
import SliderTours from './slider-tours/slider-tours';


import './style.css';

export default function MapAndSlider() {

    
    const buttons = [ 'Free Jack the Ripper' , 'Free ipper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' ,'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London ' , 'Free Jack the Ripper Tour London '];


    
    return (
        <section className='map_and_slider'>
            <div className="container">
                <h2>Tour Features</h2>
                <div className='map_block'>
                    <div className="buttons-map" >
                        {buttons.map((item , index) => <Button key={index}>{item}</Button>)}
                    </div>
                    <div>map</div>

                    <SliderTours />
                </div>
            </div>
        </section>
  )
}
