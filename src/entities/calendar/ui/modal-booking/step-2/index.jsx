'use client';
import {observer} from "mobx-react-lite";
import ModalTourItem from '../../modal-tour-item';
import Button from '@/shared/ui/selectors/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import classNames from 'classnames';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useState} from 'react';
import './style.css';


export default observer(function Step2({title, onBack, close, size, isOpened, departures, saveButton = false, setDeparture}) {

    const [selectedDep, setSelectedDep] = useState(null);
    useEscHooks(close, isOpened)


    const selectedDeparture = (dep) => {
        setDeparture(dep);
        setSelectedDep(null);
    }
    return (
        <div className={`step-2 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={close}><CloseSvg/></div>
            </div>
            <div className="choosen-date">Tomorrow, 01 December</div>
            <div className="available-tours">{departures.length} Departure(s) Available</div>

            {departures.map((dep) =>
                <ModalTourItem
                    key={`${dep.depId}:${dep.time}`}
                    dep={dep}
                    onSelected={() => {
                        setSelectedDep(dep === selectedDep ? null : dep)
                        if (!saveButton && dep !== selectedDep) {
                            selectedDeparture(dep)
                        }
                    }}
                    isActive={selectedDep === dep}
                />
            )}

            <div className={classNames({'disable': !!selectedDep})}>
                {saveButton ?
                    <Button
                        customClass='gray'
                        onClick={() => selectedDeparture(selectedDep)}
                    >
                        Save changes
                    </Button>
                    : null}
            </div>
            <Button customClass="gray" onClick={onBack}>Back</Button>
        </div>
    )
})
