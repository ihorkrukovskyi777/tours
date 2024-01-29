'use client';
import {useContext, useMemo} from "react";
import {StoreMapContext} from "@/widgets/map-and-slider/map-and-slider";
import {observer} from "mobx-react-lite";
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
    const {map: {selectedTourId,setSelectedTourId, resetSelectedTour}} = useContext(StoreMapContext);

    const fullWidth = toursPlaces.reduce((acc, value) => {
        acc = {
            width: acc.width + value.title.length,
            list: [...acc.list, value.title.length]
        }
        return acc
    }, {width: 0, list: []})


    const columns = useMemo(() => {
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
        let length = item.list.length-1
        toursRows.push(toursPlaces.slice(sliceNum, sliceNum+length))
        sliceNum = sliceNum+length
    }

    return (
        <div className="scroll">
            {toursRows.map((lists, index )=> {
                return (
                    <div className="row buttons-map" key={index}>
                        {lists.map((button) => {
                            return (

                                <button className={`${selectedTourId === button.id ? 'active' : ''}` } key={button.id} onClick={() => setSelectedTourId(button.id)}>
                                    {button.title}
                                    <span className="status" style={{backgroundColor: button.color}}></span>
                                </button>
                            )
                        })}
                    </div>
                )
            })}

            <button onClick={resetSelectedTour}>reset</button>
        </div>
    )
})
