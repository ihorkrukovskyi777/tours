'use client'
import {useEffect} from "react";
import {AdditionalOrderSingle} from "@entities/lib/calendar/models/single/additional-order.single";
import {useAnalytics} from "@entities/analytics/analytics.provider";
const ClientComponent = () => {

    const analytics = useAnalytics()
    useEffect(() => {
        new AdditionalOrderSingle().remove();
        analytics?.addEventAndResetSession({
            type: 'booking_confirmation_page'
        })
    }, [])
    return null
}
export default ClientComponent