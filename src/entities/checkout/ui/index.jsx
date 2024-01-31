"use client";
import PersonInfo from "./person-info";
import MainInfo from "./main-info";
import ButtonsInfo from "./buttons-info";
import {useContext} from "react";
import {useTranslation} from "react-i18next";
import FormContact from "@/entities/checkout/ui/form-contact";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import EditModalTour from "@/entities/checkout/ui/edit-tour-modal";
import Loader from "@/shared/ui/loaders/default-loader";
import "./style.css";

export default observer(function CheckoutSection({title}) {
    const {t} = useTranslation()
    const {checkoutInfo, isActiveCheckout, managerModal: {modalEdit}, editDeparture, globalLoading} = useContext(CheckoutStoreContext);
    return (
        <>
            {editDeparture.loading || globalLoading ?  <Loader style={{position: 'fixed', opacity: '0.4', zIndex: 9999}}/>: null}
            <section className="checkout_section">
                <div className="container">
                    {isActiveCheckout ? null : <p className="departure_alert">{t('Departure not available')}</p>}
                    <h2>{title}</h2>
                    <div className="title">{checkoutInfo.tourName}</div>
                    <PersonInfo/>
                    <MainInfo/>
                    <ButtonsInfo/>
                </div>
                <EditModalTour isOpened={modalEdit}/>
                <FormContact/>
            </section>
        </>
    );
})
