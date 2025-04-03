"use client";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import Loader from "@/shared/ui/loaders/default-loader";
import {observer} from "mobx-react-lite";
import {
    CheckoutStoreContext,
    CheckoutStoreProvider,
} from "@/entities/checkout/store/checkout-store";
import CheckoutSection from "@/entities/checkout/ui";
import {useSearchParams} from "next/navigation";
import {useAnalytics} from "@/entities/analytics/analytics.provider";
import {AdditionalOrderSingle} from "@/entities/lib/calendar/models/single/additional-order.single";

const CheckoutContent = observer(({title, i18n}) => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');
    const store = useContext(CheckoutStoreContext);
    const analytics = useAnalytics()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        new AdditionalOrderSingle().remove();
        analytics?.addEventAndResetSession({
            type: 'checkout_page'
        })
    }, [])

    useLayoutEffect(() => {
        const fetchData = async () => {
             await Promise.all([
                store.fetchCheckoutDetails(searchParams.get('code')),
                store.phone.fetchPhones()
            ])
            setLoading(false);

        }
        fetchData().then()
    }, [code]);


    const styleLoader = {
        position: 'fixed',
        top: 0,
        zIndex: 9999,
        background: '#fff',
        width: '100%',
        height: '100%',
    }

    return (
        <main>
            {store.isLoading && <p>Loading...</p>}
            {store.error && <p>Error: {store.error}</p>}
            {!loading && store.editDeparture ? <CheckoutSection title={title} i18n={i18n}/> : <div style={styleLoader}><Loader /></div>}
        </main>
    );
});

export default function Checkout({title, locale, tourLocale, i18n}) {
    return (
        <CheckoutStoreProvider locale={locale} tourLocale={tourLocale}>
            <CheckoutContent title={title} i18n={i18n}/>
        </CheckoutStoreProvider>
    );
}
