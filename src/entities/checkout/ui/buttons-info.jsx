"use client";
import Button from "@/shared/ui/selectors/button/button";
import {useTranslation} from "@/i18n/client";
import {useSearchParams, useParams} from "next/navigation";
import {getHrefLocale} from "@/i18n/get-href-locale";
import {observer} from "mobx-react-lite";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import {useContext} from "react";

export default observer(function ButtonsInfo() {
    const {t} = useTranslation()
    const params = useParams();
    const {isActiveCheckout, isContactGuide, managerModal: { toggleModalMessage, toggleModalEdit } } = useContext(CheckoutStoreContext);
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    return (
        <div className="btn_wrap">
            {isActiveCheckout ? <Button onClick={toggleModalEdit}>{t('Edit Booking')}</Button> : null }
            {isContactGuide ? <Button customClass="gray" onClick={toggleModalMessage}> {t('Contact Your Guide')} </Button> : null }
            {isActiveCheckout ? <a
                className="button_custom gray"
                href={getHrefLocale(params.locale, `cancel-book?cancelCode=${code}`)}
            >
                {t('Cancel Booking')}
            </a> : null }

        </div>
    );
})
