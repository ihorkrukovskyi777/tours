'use client'
import {useEffect} from "react";
import {AdditionalOrderSingle} from "@entities/lib/calendar/models/single/additional-order.single";
const ClientComponent = () => {
    useEffect(() => {
        new AdditionalOrderSingle().remove()
    }, [])
    return null
}
export default ClientComponent