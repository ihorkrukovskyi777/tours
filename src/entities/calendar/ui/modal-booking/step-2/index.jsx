'use client';
import ModalTourItem from '../../modal-tour-item';
import {HelperDateHtml} from "@/shared/helpers/helperDateHtml";
import Button from '@/shared/ui/selectors/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import classNames from 'classnames';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useState} from 'react';
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/helpers/date";

import './style.css';

export default function Step2({i18n, title = "test", onBack, close, size = "small", isOpened, departures, saveButton = false, setDeparture}) {
    const [selectedDep, setSelectedDep] = useState(null);
    useEscHooks(close, isOpened)


    const selectedDeparture = (dep) => {
        setDeparture(dep);
        setSelectedDep(null);
    }

    if(!departures.length) {
        return null;
    }

    const [dep] = departures;

    const serviceDate = new HelperDateHtml(setFormatDDMMYYYYtoMMDDYYYY(dep.date))

    return (
        <div className={`step-2 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {title}
                </div>
                <div className="close-button" onClick={close}><CloseSvg/></div>
            </div>
            <div className="choosen-date">{serviceDate.dayDeparture(i18n.days, i18n.months)}</div>
            <div className="available-tours">{departures.length} {i18n.departure_available}</div>

            {departures.map((dep) =>
                <ModalTourItem
                    i18n={i18n}
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
                        {i18n.save_changes}
                    </Button>
                    : null}
            </div>
            <Button customClass="gray" onClick={onBack}>{i18n.back}</Button>
        </div>
    )
}
