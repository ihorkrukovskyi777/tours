'use client';
import {useRef} from 'react';
import Button from '@/shared/ui/selectors/button/button';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import IcloudImage from "@/shared/ui/icloud-image";
import ArrowSwiper from '@/assets/images/svg/arrowSwiper-svg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';


export default function TextAndSlider({i18n, title, listText = [], attachments = [], isMobile = false}) {
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const swiperRef = useRef();

    const [width, height] = isMobile ? [340, 220] : [625, 350]
    function scrollToCalendar() {
        const section = document.querySelector('#tour_calendar_section');
        if (section) section.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    return (
        <section className="text_and_slider">
            <div className="container">
                <div className="wrapper">
                    <div className="left_box">
                        <h2>{title}</h2>
                        <div className="intro">
                            <ul>
                                {listText.map((text, index) => <li key={index} dangerouslySetInnerHTML={{__html: text ?? ''}}></li>)}
                            </ul>
                            <Button onClick={scrollToCalendar}>{i18n.book_now}</Button>

                        </div>
                    </div>
                    <div className="right_box">
                        <div className="right_box-intro">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                slidesPerView={1}
                                typeof={'bullets'}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                    swiper.navigation.nextEl = navigationNextRef.current;
                                    swiper.navigation.prevEl = navigationPrevRef.current;
                                }}

                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}
                                pagination={{clickable: true}}
                            >

                                {attachments.map((image, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='img_box'>
                                                <IcloudImage src={image.src} alt={image?.alt ?? ''} width={width} height={height}/>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}


                            </Swiper>
                            <div className='swiper-button-prev' ref={navigationPrevRef}
                                 onClick={() => swiperRef.current?.slidePrev()}><ArrowSwiper/></div>
                            <div className='swiper-button-next' ref={navigationNextRef}
                                 onClick={() => swiperRef.current?.slideNext()}><ArrowSwiper/></div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}
