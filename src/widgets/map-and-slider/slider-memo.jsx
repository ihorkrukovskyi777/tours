import {memo} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Slide from "@/widgets/map-and-slider/slide";
import Image from "next/image";
import prevSVG from "../../../public/images/svg/arrow-prev.svg";
import nextSVG from "../../../public/images/svg/arrow-next.svg";

export default memo(function SliderMemo({ i18n, changeMarker, sliders, initialSlide, selectedTourId, setSwiper}) {
    return (
        <div className="slider_block">
            <Swiper
                key={selectedTourId || 'default'}
                modules={[Navigation, Pagination]}
                spaceBetween={25}
                initialSlide={initialSlide}
                centeredSlides={true}
                onInit={(swiper) => {
                    setSwiper(swiper)
                }}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                onTouchEnd={(e) => {
                    setTimeout(() => changeMarker(e), 10)
                }}
                onNavigationNext={changeMarker}
                onNavigationPrev={changeMarker}
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
                        <SwiperSlide key={slider.id} data-id={slider.id}>
                            <Slide i18n={i18n} {...slider}></Slide>
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
})
