'use client';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import prevSVG from '../../../../public/images/svg/arrow-prev.svg';
import nextSVG from '../../../../public/images/svg/arrow-next.svg';
import tourSVG from '../../../../public/images/svg/tour.svg';
import IcloudImage from '@/shared/ui/icloud-image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

export default function SliderTours({data}) {
  
    return (
     <> 

        <div className="circle_items">
            <div className="circle_item"></div>
            <div className="circle_item"></div>
            <div className="circle_item"></div>
            <div className="circle_item circle_item-big"></div>
            <div className="circle_item-number circle_number">1</div>
            <div className="circle_item circle_item-big"></div>
            <div className="circle_item"></div>
            <div className="circle_item"></div>
            <div className="circle_brackets">({Object.keys(data).length})</div>
        </div>

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
                {data?.map((slider) =>{

                    return (
                        <SwiperSlide key={slider.id}>
                            <div className='item'>
                                <div className='item_top'>
                                    <div className="img_wrap">
                                        <div className="item_name">{slider.title}</div>
                                        <IcloudImage src={slider.attachment.src} alt='123' width={400} height={300} />
                                    </div>
                                    <div className="text_wrap">
                                        {Object.values(slider.tours).map((val) => (
                                            <div className="list" key={val}>
                                                <div>
                                                    <Image src={tourSVG} width={20} height={20} alt="icon" />
                                                </div>
                                                <div>{val}</div>
                                            </div>
                                        ))}     
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
      </>  
    )
}
