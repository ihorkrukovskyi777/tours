'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import IcloudImage from "@/shared/ui/icloud-image";
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function HighlightsSlider({ images }) {

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation={false}
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
            {images?.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                        <IcloudImage width={390} height={250} key={item.src} src={item.src} alt={item.alt} size="390x250" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}