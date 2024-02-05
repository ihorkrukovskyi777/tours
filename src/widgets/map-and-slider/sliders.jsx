import {observer} from "mobx-react-lite";
import {useContext, useCallback} from "react";
import SliderMemo from "@/widgets/map-and-slider/slider-memo";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default observer(function Sliders({ i18n }) {
    const {
        map: {
            setOpenMarkerBySlide,
            selectedTourId,
            sliders,
            initialSlide,
            setSwiper,
            setCenterMarker,
        }
    } = useContext(StoreMapContext);


    const changeMarker = useCallback((swiper) => {
        const id = swiper.slides[swiper.activeIndex]?.dataset.id
        setOpenMarkerBySlide(id);
        setCenterMarker()
    }, [])

    return <SliderMemo i18n={i18n} changeMarker={changeMarker} sliders={sliders} selectedTourId={selectedTourId} initialSlide={initialSlide} setSwiper={setSwiper}/>
})
