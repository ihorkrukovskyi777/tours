'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import IcloudImage from "@/bokun-widget/src/ui/image/cloudflaer-image";
import {Iimage} from "@entities/paid-tour/@types";

import './styles/swiper-gallery-vertical.scss';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface Props {
    images: Iimage[]
}

const SwiperGalleryVertical = ({images}: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


    return (
        <div className={`swiper_gallery_vertical`}>

            <div className="swiper-container">
                {/* Main Swiper */}
                <Swiper
                    modules={[Navigation, Thumbs]}
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    className="main-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <IcloudImage width={1920} height={1920} image={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="vertical"
                    className="thumb-swiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <IcloudImage width={1920} height={1920} image={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    )
}

export default SwiperGalleryVertical;