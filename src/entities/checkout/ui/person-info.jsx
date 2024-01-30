import FullStarSvg from "@/assets/images/svg/full-star";
import {CheckoutStoreContext} from "@/entities/checkout/store/checkout-store";
import Image from "next/image";
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {useTranslation} from "@/i18n/client";

export default observer(function PersonInfo() {
    const { t } = useTranslation();
    const { checkoutInfo } = useContext(CheckoutStoreContext);
    return (
        <div className="person_info">
            <div className="left_box">
                <ul>
                    <li>
                        <span>{t('Name')}: </span> {checkoutInfo.fullName}
                    </li>
                    <li>
                        <span>{t('Email')}: </span> {checkoutInfo.email}
                    </li>
                    <li>
                        <span>{t('Phone Number')}: </span> {checkoutInfo.phone}
                    </li>
                    <li>
                        <span>{t('Booking ID')}: </span> {checkoutInfo.bookingId}
                    </li>
                </ul>
            </div>
            <div className="right_box">
                <div className="img_box">
                    <Image
                        width={140}
                        height={140}
                        src={checkoutInfo.brandLogo}
                        alt="brand logo"
                    />
                </div>
            </div>
            <div className="text_box">
                <div className="name">{checkoutInfo.brandName}</div>
                {checkoutInfo.isShowRating && (
                    <div className="rate_box">
                        <FullStarSvg width={20} height={20}/>
                        <span>{checkoutInfo.ratingValue}</span>
                    </div>
                )}
            </div>
        </div>
    );
})
