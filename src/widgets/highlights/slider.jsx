'use client'
import {useLayoutEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import IcloudImage from "@/shared/ui/icloud-image";
import {Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import image1 from "/public/images/default-gallery-trip/gallery_img_1.jpg"
import image2 from "/public/images/default-gallery-trip/gallery_img_2-scaled.jpg"
import image3 from "/public/images/default-gallery-trip/gallery_img_3.jpg"
import image4 from "/public/images/default-gallery-trip/gallery_img_4.jpg"
import image5 from "/public/images/default-gallery-trip/gallery_img_5.jpg"
import image6 from "/public/images/default-gallery-trip/gallery_img_6.jpg"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css'
export default function HighlightsSlider({ images }) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);


    let sliders = images?.length === 1 && innerWidth < 768 ? [...images, ...images] : images;
    const options = images?.length === 1 && innerWidth < 768 ? [] : [Navigation, Pagination];
    const imageCLoud = sliders?.length > 0;
    sliders = images?.length > 0 ? sliders : [image1, image2, image3, image4, image5, image6]



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
                        {imageCLoud ?
                            <IcloudImage width={390} height={250} key={item.src} src={item.src} alt={item.alt ?? 'trip'} size="390x250" />
                            : <Image width={390} height={250} key={item.src} src={item.src} alt={item.alt ?? 'trip'} size="390x250" />
                        }
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}