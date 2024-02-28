'use client'
import {observer} from "mobx-react-lite";
import {useContext, useCallback, useEffect, useState} from "react";
import SliderMemo from "@/widgets/map-and-slider/slider-memo";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default observer(function Sliders({ i18n, hideBottom = false }) {

    const [slideIndex, setIndexSlider] = useState(1)
    const {
        map: {
            setOpenMarkerBySlide,
            selectedTourId,
            slidersFormatted,
            swiper,
            initialSlide,
            setSwiper,
            setCenterMarker,
        }
    } = useContext(StoreMapContext);


    useEffect(() => {
        const resize = () => {
            window.requestAnimationFrame(() => {

                if(window.innerWidth > 767 && slidersFormatted.length === 4) {
                    setIndexSlider(Math.ceil(Math.random() * 100))
                }
            })
        }

        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    }, [swiper])

    const changeMarker = useCallback((swiper) => {
        const id = swiper.slides[swiper.activeIndex]?.dataset.id
        setOpenMarkerBySlide(id);
        setCenterMarker()
    }, [])

    return <SliderMemo
        key={slideIndex}
        hideBottom={hideBottom}
        i18n={i18n}
        changeMarker={changeMarker}
        sliders={slidersFormatted}
        selectedTourId={selectedTourId}
        initialSlide={initialSlide}
        setSwiper={setSwiper}
    />
})
