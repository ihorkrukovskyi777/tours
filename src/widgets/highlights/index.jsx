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
    return (
        <section className="highlights">
            <div className="container">
                <div className="wrapper">
                    <h2 className="title">{t('Highlights of your trip!')}</h2>
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
                        {images.map((item) => {
                            return (
                                <SwiperSlide key={item.src}>
                                    <IcloudImage width={400} height={250} key={item.src} src={item.src} alt={item.alt} size="500x500" />
                               </SwiperSlide>
                            )
                        })}
                    </Swiper>




                </div>
            </div>

        </section>

    )
}
