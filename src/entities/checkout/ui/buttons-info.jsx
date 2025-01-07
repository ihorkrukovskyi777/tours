"use client";
import {useContext, useEffect} from "react";
import Button from "@/shared/ui/selectors/button/button";
import {useSearchParams, useParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {sendEventsGTM} from "@/shared/helpers/google/send-event";
import {observer} from "mobx-react-lite";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {setCookieSession} from "@/shared/helpers/cookies";

export default observer(function ButtonsInfo({i18n, title}) {
    const params = useParams();
    const {
        toggleGlobalLoading,
        isActiveCheckout,
        isContactGuide,
        editDeparture,
        isSelfGuide,
        managerModal: {toggleModalMessage, toggleModalEdit}
    } = useContext(CheckoutStoreContext);
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        const isOpenModal = searchParams.get("open_contact_modal");

        if(isOpenModal === '1') {
            toggleModalMessage();
        }
    }, [])

    const loadingCancelBooking = () => {
        setCookieSession('cancel_booking_locale', 'yes')
        toggleGlobalLoading(true)
        try {
            sendEventsGTM({
                eventName: 'cancel_book',
                bookID: code,
                firstName: editDeparture.firstName,
                lastName: editDeparture.lastName,
                tourName: title,
                phoneNumber: `${editDeparture.dialCode} ${editDeparture.phoneNumber}`,
                numberOfPeople: editDeparture.numberPeople,
            })
        } catch (err) {
            console.log(err)
        } finally {
            redirectPage()

        }
    }

    const redirectPage = () => {
        if(typeof window !== 'undefined') {
            window.location.href =  getHrefLocale(params.locale, `cancel-book?cancelCode=${code}`)
        }
    }
    return (
        <div className="btn_wrap">
            {isActiveCheckout && !isSelfGuide ? <Button customClass="red" onClick={toggleModalEdit}>{i18n.edit_booking}</Button> : null}
            {isContactGuide && !isSelfGuide ?
                <Button customClass="gray" onClick={toggleModalMessage}> {i18n.contact_your_guide} </Button> : null}
            {isActiveCheckout && !isSelfGuide ?
                <span
                    className="button_custom gray"
                    onClick={loadingCancelBooking}
                >

                    {i18n.cancel_book}
                </span> : null}

        </div>
    );
})
