'use client';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import prevSVG from '../../../../public/images/svg/arrow-prev.svg';
import nextSVG from '../../../../public/images/svg/arrow-next.svg';
import tourSVG from '../../../../public/images/svg/tour.svg'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

export default function SliderTours() {
    const tours = [1,3,32,31,133,213,3123];
    return (
      <div className="slider_block">
             <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination]}
                spaceBetween={25}
                centeredSlides="true"
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                loop={true}
                breakpoints={{
                    220: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3,
                    },
                }}
            >
                {tours?.map((item) =>{
                    return (
                        <SwiperSlide key={item}>
                            <div className='item'>
                                <div className='item_top'>
                                    <div className="img_wrap">
                                        <div className="item_name">Burlington Arcade</div>
                                        <Image alt="Burlington Arcade" width={400} height={300} src="https://imagedelivery.net/xtVVrgn04XP6bhrBt0jaJQ/46439860-c016-4960-fb81-79e348e40000/625x350" />
                                    </div>
                                    <div className="text_wrap">
                                        <div className="list">
                                            <div>
                                                <Image src={tourSVG} width={20} height={20} alt="icon" />
                                            </div>
                                            <div>Tour: Harry Potter London</div>
                                        </div>
                                        
                                    </div>
                                </div>
                               
                            </div>       
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className="prev">
                <Image src={prevSVG} alt='prev' width={12} height={20}></Image>
            </div>
            <div className="next">
                <Image src={nextSVG} alt='prev' width={12} height={20}></Image>
            </div>

      </div>  
    )
}
