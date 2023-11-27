import Image from 'next/image';
import DefaultImage from '@/assets/images/default-image.jpeg';
import './style.css';
export default function Highlights({title='Highlights' , items=[DefaultImage , DefaultImage , DefaultImage , DefaultImage ,DefaultImage]}) {
  return (
    <section className="highlights">
        <div className="container">
            <div className="wrapper">
                <h2 className="title">{title}</h2>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {items.map((item , index) => {
                            return (
                                <div key={index} className="swiper-slide">
                                    <Image src={item} alt='image' /> 
                                </div>
                            ) 
                        })}
                    </div>
                </div>    
            </div>
        </div>   

    </section>
    
  )
}
