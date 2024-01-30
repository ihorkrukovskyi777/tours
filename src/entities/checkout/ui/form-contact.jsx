import {observer} from "mobx-react-lite";
import DefaultModal from "@/shared/ui/modals/default-modal";
import FormContactGuide from "@/entities/checkout/ui/form-contact-guide";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {useContext} from "react";
import ThankYouMessage from "@/shared/ui/thank-you-message";
export default observer(function FormContact() {
    const { managerModal: {modalMessage ,toggleModalMessage, modalThankYou, toggleModalThankYou } } = useContext(CheckoutStoreContext);

    const sendMessage = () => {
        toggleModalMessage();
        toggleModalThankYou();
    }
    return (
        <>
            <DefaultModal
                modalShow={modalMessage}
                isOpenedModal={toggleModalMessage}
                size="default"
            >
                <FormContactGuide
                    closeModal={sendMessage}
                />
            </DefaultModal>

            <DefaultModal
                modalShow={modalThankYou}
                isOpenedModal={toggleModalThankYou}
                size="middle"
            >
                <ThankYouMessage closeModal={toggleModalThankYou}/>
            </DefaultModal>
        </>
    )
})