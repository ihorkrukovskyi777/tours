'use client';
import {HelperDateHtml} from "@/shared/hepers/helperDateHtml";
import CloseSvg from '@/assets/images/svg/close-svg';
import useEscHooks from "@/shared/hooks/use-esc-event";
import {useContext, useState} from 'react';
import {setFormatDDMMYYYYtoMMDDYYYY} from "@/shared/hepers/date";
import {useTranslation} from "@/i18n/client";
import {observer} from "mobx-react-lite";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import '@/entities/calendar/ui/modal-booking/step-2/style.css';
import ModalTourItem from "@/entities/calendar/ui/modal-tour-item";
import classNames from "classnames";
import Button from "@/shared/ui/selectors/button/button";

export default observer(function ModalListDepartures({size = "small", title, close, isOpened}) {
    const {checkoutInfo: {tourName}, managerModal: {toggleModalChoose}, editDeparture: {selectedDay, departureByDay, saveNewDep,}} = useContext(CheckoutStoreContext);
    const {t} = useTranslation()

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
            <div className="choosen-date">{serviceDate.dayDeparture(t)}</div>
            <div className="available-tours">{departureByDay.length} {t('Departure(s) Available')}</div>

            {departureByDay?.map((dep) =>
                <ModalTourItem
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
                    {t('Save changes')}
                </Button>
            </div>
            <Button customClass="gray" onClick={closeModal}>{t('Back')}</Button>
        </div>
    )
})
