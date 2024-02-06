'use client';
import {useContext, useMemo} from "react";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import {observer} from "mobx-react-lite";
import ClearSVG from '../../../assets/images/svg/clear.svg'
import Image from "next/image";
import {useWindowWidth} from '@react-hook/window-size'
import './style.css';
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
const columnsFormula = (column1, column2) => {
    let flag = false;
    let i = 0;
    while (true) {
        i++;

        if (i > 50) break;
        const lastElement = column1.list[column1.list.length - 1]
        const checkWidth = column2.width;
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
export default observer(function ButtonTours({toursPlaces, i18n}) {


    const {map: {selectedTourId,setSelectedTourId, resetSelectedTour, places, shortToursTitle}} = useContext(StoreMapContext);
    const buttons = toursPlaces.map(item => ({...item, title: shortToursTitle[item.id] ?? item.title}))
    const fullWidth = buttons.reduce((acc, value) => {
        acc = {
            width: acc.width + getTextWidth(value.title),
            list: [...acc.list, getTextWidth(value.title)]
        }
        return acc
    }, {width: 0, list: []})
    let columns = useMemo(() => {
        const columns = [
            fullWidth,
            {
            width: 0,
            list: [],
        }, {
            width: 0,
            list: [],
        }]
        let i = 0;
        let j = 0;
        let flags = [true, true];
        while (true) {
            flags[i - 1] = columnsFormula(columns[i], columns[i +1]);
            i++;
            j++;
            if (flags[0] === false && flags[1] === false || j > 30) break
            if (i === 2) i = 0;
        }
        return columns
    }, [buttons])


    const toursRows = [];
    let sliceNum = 0;
    for (const item of columns) {
        let length = item.list.length

        toursRows.push(buttons.slice(sliceNum, sliceNum+length))
        sliceNum = sliceNum+length
    }

    const windowWidth = useWindowWidth();
    let buttonsRows;
    windowWidth > 767 ? buttonsRows = [toursRows.flat()] :  buttonsRows = toursRows;

    return (
        <div className="wrap-scroll">
            <div className="scroll">
                {buttonsRows.map((lists, index )=> {
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
                })}
            </div>
            {toursPlaces.length > 1 ?
                <button className="place_select_post_clear" onClick={resetSelectedTour}>
                    <Image src={ClearSVG} alt="clear" /> {i18n.clear}
                </button> : null
            }
        </div>
    )
})
