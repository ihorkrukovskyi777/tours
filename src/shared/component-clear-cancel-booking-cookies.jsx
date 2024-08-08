'use client'

import {useEffect} from "react";
import {setCookieSession} from "@/shared/helpers/cookies";

export const ComponentClearCancelBookingCookies = ({ resetCookies = true }) => {

    useEffect(() => {
        if (resetCookies) {
            setCookieSession('cancel_booking_locale', 'no')
        }
    }, [])

    return null
}