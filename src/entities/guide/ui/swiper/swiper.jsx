'use client';
import CardGuide from '@/shared/ui/card-guide';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FullStarSvg from '@/assets/images/svg/full-star';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



export default function SwiperGuides({guides}) {

    console.log(guides , 'guides');

    return (
        <>
            <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination]}
                    spaceBetween={25}
                    navigation
                    slidesPerView={4}
                    pagination={{ clickable: true }}

                >
                    {guides?.map((item) =>{
                        const rating = item.rating.rating.toFixed(2);

                        return (
                            <SwiperSlide key={item.id}>
                                <CardGuide avatar={item.avatar} url={'/'} bottomView={item.locales}>
                                <div className="item_title">Wonders of London - Meraviglie di Londra</div>

                                {rating > 0 ?
                                    <div className="rating_box">
                                        <FullStarSvg />
                                        <div className="rating_number">{rating}</div>
                                    </div>
                                    : null 
                                }
                                </CardGuide>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
        </>
    )
}