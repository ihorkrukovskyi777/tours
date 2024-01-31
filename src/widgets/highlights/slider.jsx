'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import IcloudImage from "@/shared/ui/icloud-image";
import {Navigation, Pagination} from "swiper/modules";

export default function HighlightsSlider({ images }) {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
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
            {images?.map((item) => {
                return (
                    <SwiperSlide key={item.src}>
                        <IcloudImage width={400} height={250} key={item.src} src={item.src} alt={item.alt} size="500x500" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}