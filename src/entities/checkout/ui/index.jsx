"use client";
import {useEffect} from "react";
import PersonInfo from "./person-info";
import MainInfo from "./main-info";
import ButtonsInfo from "./buttons-info";
import {useContext} from "react";
import FormContact from "@/entities/checkout/ui/form-contact";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {observer} from "mobx-react-lite";
import EditModalTour from "@/entities/checkout/ui/edit-tour-modal";
import Loader from "@/shared/ui/loaders/default-loader";
import {useSearchParams} from "next/navigation";
import {sendEventsGTM} from "@/shared/helpers/google/send-event";
import "./style.css";

export default observer(function CheckoutSection({i18n, title}) {
    const {checkoutInfo, isActiveCheckout, isCancel, editDeparture, globalLoading} = useContext(CheckoutStoreContext);
    const searchParams = useSearchParams();



    useEffect(() => {
        try {
            if(searchParams.get('cancedit') && window.localStorage.getItem('edit_tour') === null) {
                sendEventsGTM({
                    eventName: 'edit_tour',
                    bookID: searchParams.get('code'),
                    firstName: editDeparture.firstName,
                    lastName: editDeparture.lastName,
                    tourName: title,
                    phoneNumber: `${editDeparture.dialCode} ${editDeparture.phoneNumber}`,
                    numberOfPeople: editDeparture.numberPeople,
                })
                window.localStorage.setItem('edit_tour', '1')
            }

        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <>
            {editDeparture?.loading || globalLoading ?  <Loader style={{position: 'fixed', opacity: '0.4', zIndex: 9999}}/>: null}
            <section className="checkout_section">
                <div className="container">
                    <div className="notification_booking_status">
                        {isActiveCheckout ? null : <p className="departure_alert">{i18n.departure_not_available}</p>}
                        {!isCancel ? null : <p className="departure_alert">{i18n.booking_canceled}</p>}
                    </div>
                    <h2>{title}</h2>
                    <div className="title" dangerouslySetInnerHTML={{__html: checkoutInfo.tourName ?? ''}}></div>
                    <PersonInfo i18n={i18n}/>
                    <MainInfo i18n={i18n}/>
                    <ButtonsInfo i18n={i18n} title={title}/>
                </div>
                <EditModalTour i18n={i18n} title={title}/>
                <FormContact i18n={i18n}/>
            </section>
        </>
    );
})
