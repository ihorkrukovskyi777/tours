'use client'
import {observer} from "mobx-react-lite";
import DefaultModal from "@/shared/ui/modals/default-modal";
import FormContactGuide from "@/entities/checkout/ui/form-contact-guide";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {useContext} from "react";
import ThankYouMessage from "@/shared/ui/thank-you-message";
import {useSearchParams, usePathname} from "next/navigation";
export default observer(function FormContact({ i18n }) {
    const {pageOptions, managerModal: {modalMessage ,toggleModalMessage, modalThankYou, toggleModalThankYou } } = useContext(CheckoutStoreContext);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const sendMessage = () => {
        toggleModalMessage();
        toggleModalThankYou();
        window.history.replaceState({}, document.title, `${pathname}?code=${code}` );
    }
    return (
        <>
            <DefaultModal
                modalShow={modalMessage}
                isOpenedModal={toggleModalMessage}
                size="default"
            >
                <FormContactGuide
                    i18n={i18n}
                    closeModal={sendMessage}
                />
            </DefaultModal>

            <DefaultModal
                modalShow={modalThankYou}
                isOpenedModal={toggleModalThankYou}
                size="middle"
            >
                <ThankYouMessage i18n={i18n} closeModal={toggleModalThankYou} message={pageOptions.thankYouPageMessage}/>
            </DefaultModal>
        </>
    )
})