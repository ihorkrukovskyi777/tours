'use client';
import {useContext, useMemo, useState} from "react";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import {observer} from "mobx-react-lite";
import ClearSVG from '../../../assets/images/svg/clear.svg'
import Image from "next/image";
import {useWindowWidth} from '@react-hook/window-size'
import './style.css';



const columnsFormula = (column1, column2) => {
    let flag = false;
    let i = 0;
    while (true) {
        i++;

        if (i > 20) break;
        const lastElement = column1.list[column1.list.length - 1]
        const checkWidth = column2.width + lastElement;
        if (column1.width > checkWidth) {
            flag = true;
            column1.width = column1.width - lastElement;
            column1.list.pop();
            column2.width = column2.width + lastElement;
            column2.list.unshift(lastElement);
            continue
        }
        break
    }
    return flag
}
export default observer(function ButtonTours({toursPlaces}) {
    const {map: {selectedTourId,setSelectedTourId, resetSelectedTour, places}} = useContext(StoreMapContext);

    const fullWidth = toursPlaces.reduce((acc, value) => {
        acc = {
            width: acc.width + value.title.length,
            list: [...acc.list, value.title.length]
        }
        return acc
    }, {width: 0, list: []})


    let columns = useMemo(() => {
        const columns = [{
            width: 0,
            list: [],
        }, {
            width: 0,
            list: [],
        }, fullWidth]
        let i = 2;
        let j = 0;
        let flags = [true, true];
        while (true) {
            flags[i - 1] = columnsFormula(columns[i], columns[i - 1]);
            i--;
            j++;
            if (flags[0] === false && flags[1] === false || j > 20) break
            if (i === 0) i = 2;
        }
        return columns
    }, [toursPlaces])



    const toursRows = [];
    let sliceNum = 0;
    for (const item of columns) {
        let length = item.list.length

        toursRows.push(toursPlaces.slice(sliceNum, sliceNum+length))
        sliceNum = sliceNum+length
    }


    const onlyWidth = useWindowWidth();
    const [windowWidth , setWindowWidth] = useState(onlyWidth)
    const numbers = [1, 2, 3, 4, 5];

    const mobileButtons = toursRows.map((lists, index )=> {
        if(lists.length === 0) return null

        return (
            <div className="row buttons-map" key={index}>
                {lists.map((button) => {
                    const isDisableClass = !places.find(place => !!place.tours[button.id]) ? {pointerEvents: 'none', opacity: '0.4'} : {}
                    const isActiveClass = `${selectedTourId === button.id ? 'active' : ''}`;
                    return (
                        <button style={isDisableClass} className={isActiveClass} key={button.id} onClick={() => setSelectedTourId(button.id)}>
                            {button.title}
                            <span className="status" style={{backgroundColor: button.color}}></span>
                        </button>
                    )
                })}
            </div>
        )
    })

    const desktopButtons = toursRows.map((lists, index )=> {
        if(lists.length === 0) return null
        return (
            <>
                {lists.map((button) => {
                    const isDisableClass = !places.find(place => !!place.tours[button.id]) ? {pointerEvents: 'none', opacity: '0.4'} : {}
                    const isActiveClass = `${selectedTourId === button.id ? 'active' : ''}`;
                    return (
                        <button style={isDisableClass} className={isActiveClass} key={button.id} onClick={() => setSelectedTourId(button.id)}>
                            {button.title}
                            <span className="status" style={{backgroundColor: button.color}}></span>
                        </button>
                    )
                })}
            </>
        )
    })

    return (
        <div className="scroll-wrap">
            <div className="scroll">
                {onlyWidth < 767 ? mobileButtons : desktopButtons}
            </div>
            {toursPlaces.length > 0 ?
                <button className="place_select_post_clear" onClick={resetSelectedTour}>
                    <Image src={ClearSVG} alt="clear" /> Clear
                </button> : null
            }
        </div>
    )
})
