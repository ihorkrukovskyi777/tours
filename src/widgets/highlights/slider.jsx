'use client'
import {useLayoutEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import IcloudImage from "@/shared/ui/icloud-image";
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css'
export default function HighlightsSlider({ images }) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const sliders = images?.length === 1 && innerWidth < 768 ? [...images, ...images] : images;
    const options = images?.length === 1 && innerWidth < 768 ? [] : [Navigation, Pagination];

    useLayoutEffect(() => {
        const resize = () => setInnerWidth(window.innerWidth)
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize);
    }, [])
    return (
        <Swiper
            modules={options}
            navigation={false}
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            pagination={{ clickable: true }}
            breakpoints={{
                220: {
                    slidesPerView: 1.17,
                },
                768: {
                    slidesPerView: 3,
                },
            }}
        >
            {sliders?.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <IcloudImage width={390} height={250} key={item.src} src={item.src} alt={item.alt} size="390x250" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}