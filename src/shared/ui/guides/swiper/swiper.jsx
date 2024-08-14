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

    const totalGuides = guides?.length;


    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination , A11y]}
                spaceBetween={25}
                slidesPerView={4}
                pagination={{clickable: true}}
                watchOverflow={true}
                //typeof={"bullets"}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
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
            </Swiper>

            {totalGuides > 4 ?
                <>
                    <div className="prev">
                        <Image src={prevSVG} alt='prev' width={12} height={20}></Image>
                    </div>
                    <div className="next">
                        <Image src={nextSVG} alt='prev' width={12} height={20}></Image>
                    </div>
                </>
                : null
            }
        </>


    )
}
