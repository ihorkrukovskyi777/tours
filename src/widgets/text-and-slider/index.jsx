
'use client';
import Button from '@/shared/ui/selectors/button/button';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import ArrowSwiper from '@/assets/images/svg/arrowSwiper-svg';
import DefaultImage from '@/assets/images/default-image.jpeg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';
import { useRef } from 'react';



export default function TextAndSlider() {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const swiperRef = useRef();

  function scrollToCalendar() {
    const section = document.querySelector( '#tour_calendar_section');
    if(section) section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };

  return (
    <section className="text_and_slider">
        <div className="container">
            <div className="wrapper">
                <div className="left_box">
                    <h2>Free London by the Thames Tour</h2>
                    <div className="intro">
                        <ul>
                            <li>
                                Embark on a journey through time and culture as you walk along the iconic River Thames’
                                <span>North and South Banks</span>
                            </li>
                            <li>
                                Embark on a journey through time and culture as you walk along the iconic River Thames’
                                <span>North and South Banks</span>
                            </li>
                            <li>
                                Embark on a journey through time and culture as you walk along the iconic River Thames’
                                <span>North and South Banks</span>
                            </li>
                        </ul>
                        <Button onClick={scrollToCalendar}>Book Now</Button>

                    </div>
                </div>
                <div className="right_box">
                    <div className="right_box-intro">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            slidesPerView={1}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                                swiper.navigation.nextEl = navigationNextRef.current;
                                swiper.navigation.prevEl = navigationPrevRef.current;
                              }}

                              navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                              }}
                            pagination={{ clickable: true }}
                            >
                            <SwiperSlide>
                                 <div className='img_box'>
                                    <Image src={DefaultImage} alt='0' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                 <div className='img_box'>
                                    <Image src={DefaultImage} alt='1' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                 <div className='img_box'>
                                    <Image src={DefaultImage} alt='1' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                 <div className='img_box'>
                                    <Image src={DefaultImage} alt='1' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                 <div className='img_box'>
                                    <Image src={DefaultImage} alt='1' />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className='swiper-button-prev' ref={navigationPrevRef} onClick={() => swiperRef.current?.slidePrev()}><ArrowSwiper /></div>
                        <div className='swiper-button-next' ref={navigationNextRef} onClick={() => swiperRef.current?.slideNext()} ><ArrowSwiper /></div>
                    </div>
                </div>
            </div>
        </div>

    </section>

  )
}
