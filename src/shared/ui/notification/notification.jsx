'use client'
import {useTranslation} from "@/i18n/client";
import './style.css'
export default function Notification({ i18n, close }) {
    const { t } = useTranslation()
    return (
        <div className="notification" onClick={close}>
            <i className="far fa-times-circle shine"></i>
            &nbsp; &nbsp;
            <span>{i18n.notification_wrong}</span>
        </div>
    )
}