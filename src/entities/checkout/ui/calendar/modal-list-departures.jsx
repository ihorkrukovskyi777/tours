'use client';
import {HelperDateHtml} from "@/shared/helpers/helperDateHtml";
import CloseSvg from '@/assets/images/svg/close-svg';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useContext, useState} from 'react';
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/helpers/date";
import {observer} from "mobx-react-lite";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import ModalTourItem from "@/entities/calendar/ui/modal-tour-item";
import classNames from "classnames";
import Button from "@/shared/ui/selectors/button/button";
import '@/entities/calendar/ui/modal-booking/step-2/style.css';

export default observer(function ModalListDepartures({i18n, size = "small", title, close, isOpened}) {
    const {checkoutInfo: {tourName}, managerModal: {toggleModalChoose}, editDeparture: {selectedDay, departureByDay, saveNewDep,}} = useContext(CheckoutStoreContext);

    const [selectedDep, setSelectedDep] = useState(null);

    const closeModal = () => {
        setSelectedDep(null)
        close()
    }
    useEscHooks(closeModal, isOpened)

    if (selectedDay === null) {
        return null;
    }
    const serviceDate = new HelperDateHtml(setFormatDDMMYYYYtoMMDDYYYY(selectedDay))
    return (
        <div className={`step-2 ${size}`}>
            <div className="title">
                <div className="title_text">
                    {tourName}
                </div>
                <div className="close-button" onClick={closeModal}><CloseSvg/></div>
            </div>
            <div className="choosen-date">{serviceDate.dayDeparture(i18n.days, i18n.months)}</div>
            <div className="available-tours">{departureByDay.length} {i18n.departures_available}</div>

            {departureByDay?.map((dep) =>
                <ModalTourItem
                    i18n={i18n}
                    isActive={selectedDep === dep}
                    key={`${dep.depId}:${dep.time}`}
                    dep={dep}
                    onSelected={() => {
                        setSelectedDep(dep === selectedDep ? null : dep)
                    }}
                />
            )}

            <div className={classNames({'disable': !selectedDep})}>
                <Button
                    customClass={!selectedDep ? 'gray' : ''}
                    onClick={() => {
                        saveNewDep(selectedDep)
                        toggleModalChoose()
                        closeModal();
                    }}
                >
                    {i18n.save_changes}
                </Button>
            </div>
            <Button customClass="gray" onClick={closeModal}>{i18n.back}</Button>
        </div>
    )
})
