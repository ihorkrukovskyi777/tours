"use client";
import Button from "@/shared/ui/selectors/button/button";
import {useSearchParams, useParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {observer} from "mobx-react-lite";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {useContext} from "react";

export default observer(function ButtonsInfo({i18n}) {
    const params = useParams();
    const {
        toggleGlobalLoading,
        isActiveCheckout,
        isContactGuide,
        managerModal: {toggleModalMessage, toggleModalEdit}
    } = useContext(CheckoutStoreContext);
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    return (
        <div className="btn_wrap">
            {isActiveCheckout ? <Button customClass="red" onClick={toggleModalEdit}>{i18n.edit_booking}</Button> : null}
            {isContactGuide ?
                <Button customClass="gray" onClick={toggleModalMessage}> {i18n.contact_your_guide} </Button> : null}
            {isActiveCheckout ?
                <a
                    className="button_custom gray"
                    onClick={() => toggleGlobalLoading(true)}
                    href={getHrefLocale(params.locale, `cancel-book?cancelCode=${code}`)}
                >
                    {i18n.cancel_book}
                </a> : null}

        </div>
    );
})
