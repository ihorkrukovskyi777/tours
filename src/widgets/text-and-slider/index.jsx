"use client";
import { useRef } from "react";
import Button from "@/shared/ui/selectors/button/button";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IcloudImage from "@/shared/ui/icloud-image";
import ArrowSwiper from "@/assets/images/svg/arrowSwiper-svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

export default function TextAndSlider({
  i18n,
  title,
  listText = [],
  attachments = [],
  isMobile = false,
}) {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const swiperRef = useRef();

  const [width, height] = isMobile ? [340, 220] : [625, 350];

  function scrollToCalendar() {
    let section =
      document.querySelector("#tour_calendar_section") ;

    if(section.style.display === 'none') {
      section = document.querySelector("#insert_code_block")
    }

    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const isShowArrow = (index, total) => {
    navigationPrevRef.current.style.visibility =
      index === 0 ? "hidden" : "visible";
    navigationNextRef.current.style.visibility =
      index === total ? "hidden" : "visible";
  };

  return (
    <section className="text_and_slider" style={{zIndex: 999, position: 'relative'}}>
      <div className="container">
        <div className="wrapper">
          <div className="left_box">
            <h2>{title}</h2>
            <div className="intro">
              <ul>
                {listText.map((text, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: text ?? "" }}
                  ></li>
                ))}
              </ul>
              <Button onClick={scrollToCalendar}>{i18n.book_now}</Button>
            </div>
          </div>
          <div className="right_box">
            <div className="right_box-intro">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
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
                pagination={{ clickable: true }}
              >
                {attachments.map((image, index) => {
                  const src = `${process.env.NEXT_PUBLIC_CLOUD_IMAGE}/${image.src}/public`
                  return (
                    <SwiperSlide key={index}>
                      <div className="img_box">
                        <img
                          loading="lazy"
                          src={src}
                          alt={image?.alt ?? ""}
                          width={width}
                          height={height}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div
                style={{ visibility: "hidden" }}
                className="swiper-button-prev"
                ref={navigationPrevRef}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ArrowSwiper />
              </div>
              <div
                className="swiper-button-next"
                ref={navigationNextRef}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ArrowSwiper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
