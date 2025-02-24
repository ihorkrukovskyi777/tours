'use client'
import GoogleMapsMarker, {Props} from "@entities/paid-tour/ui/map/google-maps-marker";
import {useTranslations} from "next-intl";
import {useState} from "react";

const ShowMapAfterClick = (props : Props) => {
    const [isShow, setShow] = useState(() => false)
    const t = useTranslations()
    return (
        <>
            { !isShow ? <button onClick={() => setShow(true)}>{t('showLocation')}</button> : null }
            {isShow ? <GoogleMapsMarker {...props} /> : null}
        </>
    )
}

export default ShowMapAfterClick