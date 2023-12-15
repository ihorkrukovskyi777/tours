'use client';
import CardGuide from '@/shared/ui/card-guide';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FullStarSvg from '@/assets/images/svg/full-star';
import LanguageImages from '@/shared/ui/language-images';
import DefaultImage from '@/assets/images/languages/USUKflag.jpg';
const languagesAll = [DefaultImage , DefaultImage , DefaultImage];
import './style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const dataSlider = [
  { id:423, title: 'Your Guides in Bogota'},
  { id:242, title: 'Your Guides in London'},
  { id:2342, title: 'Your Guides in London123'},
  { id:467, title: 'Your Guides in London11'},
  { id:765, title: 'Your Guides in London11121'},
  { id:756, title: 'Your Guides in London1212'},
]

export default function Guides({title="Your Guides in Bogota" , items=[dataSlider]}) {
  return (
    <section className="guides_section">
        <div className="container">
            <h2>{title}</h2>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination]}
                spaceBetween={25}
                navigation
                slidesPerView={4}
                pagination={{ clickable: true }}

              >
                  {items.map((item, index) =>{
                      return (
                          <div className="swiper-slide" key={index}>
                            <SwiperSlide>
                              <CardGuide img={DefaultImage} url={'/'} bottomView={<LanguageImages data={languagesAll} />}>
                              <div className="item_title">Wonders of London - Meraviglie di Londra</div>
                              <div className="rating_box">
                                  <FullStarSvg />
                                  <div className="rating_number">4.88</div>
                              </div>

                              </CardGuide>
                            </SwiperSlide>
                          </div>

                      )
                  })}
            </Swiper>

        </div>

    </section>

  )
}
