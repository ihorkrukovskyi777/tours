'use client';
import {observer} from "mobx-react-lite";
import ModalTourItem from '../../modal-tour-item';
import {HelperDateHtml} from "@/shared/hepers/helperDateHtml";
import Button from '@/shared/ui/selectors/button/button';
import CloseSvg from '@/assets/images/svg/close-svg';
import classNames from 'classnames';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useState} from 'react';
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/hepers/date";
import {useTranslation} from "@/i18n/client";

import './style.css';

export default function Step2({title = "test", onBack, close, size = "small", isOpened, departures, saveButton = false, setDeparture}) {
    const { t} = useTranslation()
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
            <div className="choosen-date">{serviceDate.dayDeparture(t)}</div>
            <div className="available-tours">{departures.length} {t('Departure(s) Available')}</div>

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
                        {t('Save changes')}
                    </Button>
                    : null}
            </div>
            <Button customClass="gray" onClick={onBack}>Back</Button>
        </div>
    )
}
