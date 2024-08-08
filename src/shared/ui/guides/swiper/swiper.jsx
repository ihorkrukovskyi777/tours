'use client';
import {useParams} from "next/navigation";
import {hrefSubVendor} from "@/shared/helpers/url";
import {A11y, Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import CardGuide from '@/shared/ui/card-components/card-guide';
import FullStarSvg from '@/assets/images/svg/full-star';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import prevSVG from "../../../../../public/images/svg/arrow-prev.svg";
import nextSVG from "../../../../../public/images/svg/arrow-next.svg";
import '../style.css';
import ArrowSwiper from "@/assets/images/svg/arrowSwiper-svg";
import {useRef} from "react";



export default function SwiperGuides({guides}) {
    const params = useParams();
    const locale = params.locale;


    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const swiperRef = useRef();


    const isShowArrow = (index, total) => {
        navigationPrevRef.current.style.visibility =
            index === 0 ? "hidden" : "visible";
        navigationNextRef.current.style.visibility =
            index === total ? "hidden" : "visible";
    };
    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination , Scrollbar, A11y]}
                spaceBetween={25}
                slidesPerView={4}
                pagination={{clickable: true}}

                typeof={"bullets"}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.prevEl = navigationPrevRef.current;
                }}
                init={(swiper) => {
                    isShowArrow(swiper.activeIndex, swiper.slides.length - 1);
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onSlideChange={(swiper) => {
                    isShowArrow(swiper.activeIndex, swiper.slides.length - 1);
                }}

                breakpoints={{
                    220: {
                        slidesPerView: 1.7,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                }}
            >
                {guides?.map((item) => {
                    const rating = item.rating.rating.toFixed(2);
                    return (
                        <SwiperSlide key={item.id}>
                            <CardGuide
                                avatar={item?.avatar}
                                url={hrefSubVendor(locale, item.brandName)}
                                bottomView={item?.locales}
                            >
                                <div className="item_title">{item?.brandName}</div>
                                {rating > 0 ?
                                    <div className="rating_box">
                                        <FullStarSvg/>
                                        <div className="rating_number">{rating}</div>
                                    </div>
                                    : null
                                }
                            </CardGuide>
                        </SwiperSlide>
                    )
                })}
                {guides?.map((item) => {
                    const rating = item.rating.rating.toFixed(2);
                    return (
                        <SwiperSlide key={item.id}>
                            <CardGuide
                                avatar={item?.avatar}
                                url={hrefSubVendor(locale, item.brandName)}
                                bottomView={item?.locales}
                            >
                                <div className="item_title">{item?.brandName}</div>
                                {rating > 0 ?
                                    <div className="rating_box">
                                        <FullStarSvg/>
                                        <div className="rating_number">{rating}</div>
                                    </div>
                                    : null
                                }
                            </CardGuide>
                        </SwiperSlide>
                    )
                })}
                {guides?.map((item) => {
                    const rating = item.rating.rating.toFixed(2);
                    return (
                        <SwiperSlide key={item.id}>
                            <CardGuide
                                avatar={item?.avatar}
                                url={hrefSubVendor(locale, item.brandName)}
                                bottomView={item?.locales}
                            >
                                <div className="item_title">{item?.brandName}</div>
                                {rating > 0 ?
                                    <div className="rating_box">
                                        <FullStarSvg/>
                                        <div className="rating_number">{rating}</div>
                                    </div>
                                    : null
                                }
                            </CardGuide>
                        </SwiperSlide>
                    )
                })}
            </Swiper>


            <div
                style={{ visibility: "hidden" }}
                className="swiper-button-prev prev"
                ref={navigationPrevRef}
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ArrowSwiper />
            </div>
            <div
                className="swiper-button-next next"
                ref={navigationNextRef}
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ArrowSwiper />
            </div>

            {/*<div className="prev swiper-button-disabled">
                <Image src={prevSVG} alt='prev' width={12} height={20}></Image>
            </div>
            <div className="next">
                <Image src={nextSVG} alt='prev' width={12} height={20}></Image>
            </div>*/}

        </>


    )
}
