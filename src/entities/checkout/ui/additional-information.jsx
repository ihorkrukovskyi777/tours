
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";

export default observer(function AdditionalInformation({ i18n }) {
    const { checkoutInfo } = useContext(CheckoutStoreContext);
    return (
        <div className="additional-information">
            <h3>{i18n.additional_information}<span className="dot">:</span></h3>
            <p>Take the right after the stars and look out for a green umbrella.</p>
        </div>
    );
})
