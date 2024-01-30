'use client'
import {useTranslation} from "@/i18n/client";
import './style.css'
export default function Notification({ close }) {
    const { t } = useTranslation()
    return (
        <div className="notification" onClick={close}>
            <i className="far fa-times-circle shine"></i>
            &nbsp; &nbsp;
            <span>{t('Something went wrong, we couldn\'t change your order')}</span>
        </div>
    )
}