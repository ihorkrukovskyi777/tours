"use client";
import React, {useContext, useEffect, useLayoutEffect} from "react";
import {observer} from "mobx-react-lite";
import {
    CheckoutStoreContext,
    CheckoutStoreProvider,
} from "@/entities/checkout/store/checkout-store";
import CheckoutSection from "@/entities/checkout/ui";
import {useSearchParams} from "next/navigation";

const CheckoutContent = observer(({title}) => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');
    const store = useContext(CheckoutStoreContext);

    useLayoutEffect(() => {
        const fetchData = async () => {
             await Promise.all([
                store.fetchCheckoutDetails(searchParams.get('code')),
                store.phone.fetchPhones()
            ])

        }
        fetchData().then()
    }, [code]);

    return (
        <main>
            {store.isLoading && <p>Loading...</p>}
            {store.error && <p>Error: {store.error}</p>}
            {store.editDeparture ? <CheckoutSection title={title}/> : null}
        </main>
    );
});

export default function Checkout({title, locale, tourLocale}) {
    return (
        <CheckoutStoreProvider locale={locale} tourLocale={tourLocale}>
            <CheckoutContent title={title}/>
        </CheckoutStoreProvider>
    );
}
