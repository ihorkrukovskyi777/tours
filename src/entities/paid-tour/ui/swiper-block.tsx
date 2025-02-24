'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import {ReactNode, useEffect, useState} from "react";
import {Children} from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import './styles/swiper-block.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface Props {
    spaceBetween: number,
    slidesPerView: number,
    loop?: boolean,
    children: ReactNode,
    navigation?: boolean,
    pagination?: boolean,
    padding?: string,
    arrowPadding?: string
    borderRadius?: number,
    mobileSlidesPerView?: number ,
    slidesMD?: number ,
    mobileDestroy?: boolean,
    desktopDestroy?: boolean,
    gradientRight?: boolean,
    gradientLeft?: boolean,
    autoHeightSlide?: boolean,
    customClass?: string
    mobileFixedWidth?: boolean,
    centerSlides?:boolean
}

const SwiperBlock = ({
                         borderRadius = 16 ,
                         spaceBetween = 16 ,
                         slidesPerView = 3 ,
                         loop = false ,
                         children ,
                         navigation = true ,
                         pagination = false,
                         padding = '50',
                         arrowPadding = '0',
                         slidesMD = 2,
                         mobileDestroy = false,
                         desktopDestroy = false,
                         gradientRight = false ,
                         gradientLeft = false,
                         autoHeightSlide = false ,
                         customClass = '',
                         mobileFixedWidth = false,
                         centerSlides = false,
                     } : Props) => {

    const [windowSize, setWindowSize] = useState({
        width: 0,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        // Set initial window size
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const showPadding = loop ? `padding_${padding}` : '';
    const showGradientRight = gradientRight ? `gradient_right_white` : '';
    const showGradientLeft = gradientLeft ? `gradient_left_white` : '';
    const showBorderRadius = `border_radius_${borderRadius}`;
    const desktopDestroySlider = desktopDestroy ? `desktop_destroy_slider` : '';
    const autoHeightSlides = autoHeightSlide ? `auto_height_slides` : '';
    const mobileWidth = mobileFixedWidth ? `mobile_fixed_width` : '';
    const childrenCount = Children.count(children);



    return (
        <div className={`swiper_block ${showPadding} ${showGradientRight} ${showGradientLeft} ${showBorderRadius} ${desktopDestroySlider} ${autoHeightSlides} ${customClass} ${mobileWidth}`}
            // @ts-ignore
             style={{ '--arrowPadding': `${arrowPadding}px` }}
        >
            {windowSize.width < 767 && mobileDestroy ?
                <div className="destroy-wrap">
                    {Children.map(children, child => <div className="slide-destroy-block">{child}</div>)}
                </div>
                :
                <Swiper
                    className={'MainSlider'}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    pagination={pagination as boolean}
                    navigation={navigation as boolean}
                    watchOverflow={true}
                    loop={loop}
                    breakpoints={{
                        320: {slidesPerView: 'auto', centeredSlides: centerSlides === false ? false : childrenCount > 2},
                        768: {slidesPerView: slidesMD, centeredSlides: false},
                        1024: {slidesPerView: slidesPerView},
                    }}
                >
                    {Children.map(children, child =>
                        <SwiperSlide>{child}</SwiperSlide>
                    )}
                </Swiper>

            }


        </div>
    )
}

export default SwiperBlock