'use client';
import Sliders from "@/widgets/map-and-slider/sliders";
import Slide from "@/widgets/map-and-slider/slide";
import {observer} from "mobx-react-lite";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import {useContext} from "react";
import {useWindowWidth} from '@react-hook/window-size';
import './style.css';


export default observer(function SliderTours({data}) {
    const {
        map: {
            sliders,
            places,
            selectedPlaceId,
            currentIndexPlace,
            setSwiper,
            setOpenMarker,
            remove
        }
    } = useContext(StoreMapContext);

    const onlyWidth = useWindowWidth()
    const countSliderSettings = onlyWidth > 767 ? 3 : 1;


    if (sliders.length <= countSliderSettings) {
        return (
            <div className="slider_block swiper-less-3">
                <div className="swiper-wrapper">

                    {sliders.map(slider => {
                        return (
                            <div className={`swiper-slide ${slider.id === selectedPlaceId ? 'active' : ''}`}
                                 key={slider.id} onClick={() => setOpenMarker(slider.id)}>
                                <Slide {...slider}></Slide>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <>
            <button className="remove" onClick={remove}>remove</button>
            <div className="circle_items">
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_item circle_item-big"></div>
                <div className="circle_item-number circle_number">{currentIndexPlace + 1}</div>
                <div className="circle_item circle_item-big"></div>
                <div className="circle_item"></div>
                <div className="circle_item"></div>
                <div className="circle_brackets">({places.length})</div>
            </div>
            {sliders.length > 3 ? <Sliders setSwiper={setSwiper} sliders={sliders} /> : null }
        </>
    )
})
