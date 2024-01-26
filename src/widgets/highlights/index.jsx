'use client';
import IcloudImage from "@/shared/ui/icloud-image";
import {getHighlightsImages} from "@/entities/api";
import {createTranslation } from "@/i18n/server";
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

export default async function Highlights({id}) {
    const { t} = await createTranslation();
    const images = await getHighlightsImages(id);
    console.log(images);
    return (
        <section className="highlights">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{t('Highlights of your trip!')}</h2>
                    {/* <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination]}
                        spaceBetween={25}
                        navigation
                        slidesPerView={4}
                        pagination={{ clickable: true }}
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
                        {images.map(({item , index}) => {
                            console.log(item);
                            return (
                                <SwiperSlide key={index}>
                                    <div className="swiper-slide">
                                        image   
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper> */}




                </div>
            </div>

        </section>

    )
}
