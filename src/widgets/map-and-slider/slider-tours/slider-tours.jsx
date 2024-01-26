'use client';
import {useEffect, useRef} from "react";
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import {observer} from "mobx-react-lite";
import prevSVG from '../../../../public/images/svg/arrow-prev.svg';
import nextSVG from '../../../../public/images/svg/arrow-next.svg';
import tourSVG from '../../../../public/images/svg/tour.svg';
import IcloudImage from '@/shared/ui/icloud-image';
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import {useContext} from "react";
import {useWindowWidth} from '@react-hook/window-size';
import Ticket from "./ticket";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';


export default observer(function SliderTours({data}) {
    const swiperRef = useRef(null);
    const {map: {sliders, places, selectedPlaceId, currentIndexPlace, setSwiper, setOpenMarker, remove}} = useContext(StoreMapContext);
    
    const tickets = [1,2,3,4];
    const onlyWidth = useWindowWidth()
    const countSliderSettings =  onlyWidth > 767 ? 3 : 1;  

    useEffect(() => {
        if (swiperRef.current) {
            setSwiper(swiperRef.current)
        } else if(sliders.length <= 3) {
            setSwiper({
                on() {
                    
                },
                slideToLoop(val) {
                    console.log(val)
                }
            })
        }
    }, [swiperRef, selectedPlaceId])


    if (sliders.length <= countSliderSettings) {
        return (
            <div className="slider_block swiper-less-3">
                <div className="swiper-wrapper">

                    {sliders.map(slider => {
                        return (
                            <div className={`swiper-slide ${slider.id === selectedPlaceId ? 'active' : ''}`} key={slider.id} onClick={() => setOpenMarker(slider.id)}>
                                <div  className='item' data-place-id={`${slider.id}`}>
                                    <div className='item_top'>
                                        <div className="img_wrap">
                                            <div className="item_name">{slider.title}</div>
                                            <IcloudImage src={slider.attachment.src} alt='123' width={400}
                                                         height={300}/>
                                        </div>
                                        <div className="text_wrap">
                                            {Object.values(slider.tours).map((val) => (
                                                <div className="list" key={val}>
                                                    <div>
                                                        <Image src={tourSVG} width={20} height={20} alt="icon"/>
                                                    </div>
                                                    <div>{val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                                         

                                                

                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
    return (
        <>
            <button className="remove" onClick={remove}>remove</button>
            <div className="circle_items">
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_item circle_item-big"></div>
                <div className="circle_item-number circle_number">{currentIndexPlace + 1}</div>
                <div className="circle_item circle_item-big"></div>
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_brackets">({places.length})</div>
            </div>

            <div className="slider_block">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination]}
                    spaceBetween={25}
                    centeredSlides={true}
                    navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                    }}
                    onInit={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    loop={sliders.length > 3}
                    breakpoints={{
                        220: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {sliders.map((slider) => {

                        return (
                            <SwiperSlide key={slider.id}>
                                <div className='item' data-place-id={`${slider.id}`}>
                                    <div className='item_top'>
                                        <div className="img_wrap">
                                            <div className="item_name">{slider.title}</div>
                                            <IcloudImage src={slider.attachment.src} alt='123' width={400}
                                                         height={300}/>
                                        </div>
                                        <div className="text_wrap">
                                            {Object.values(slider.tours).map((val) => (
                                                <div className="list" key={val}>
                                                    <div>
                                                        <Image src={tourSVG} width={20} height={20} alt="icon"/>
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
})
