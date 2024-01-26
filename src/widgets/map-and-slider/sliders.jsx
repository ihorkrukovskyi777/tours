import {useEffect, useRef, memo} from "react";
import {observer} from "mobx-react-lite";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Slide from "@/widgets/map-and-slider/slide";
import Image from "next/image";
import prevSVG from "../../../public/images/svg/arrow-prev.svg";
import nextSVG from "../../../public/images/svg/arrow-next.svg";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default observer(function Sliders({sliders, setSwiper}) {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            setSwiper(swiperRef.current)
        } else if (sliders.length <= 3) {
            setSwiper({
                on() {

                },
                slideToLoop(val) {
                    console.log(val)
                }
            })
        }
    }, [swiperRef, sliders])
    return (
        <div className="slider_block">
            <Swiper
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
                            <Slide {...slider}></Slide>
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
