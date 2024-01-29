"use client";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    CheckoutStoreContext,
    CheckoutStoreProvider,
} from "@/entities/checkout/store/checkout-store";
import CheckoutSection from "@/entities/checkout/ui";
import {useSearchParams} from "next/navigation";

const CheckoutContent = observer(({ title }) => {
    const searchParams = useSearchParams()
    const store = useContext(CheckoutStoreContext);
    const code = searchParams.get('code');
    useEffect(() => {
        store.fetchCheckoutDetails(searchParams.get('code'));
    }, [store, code]);

    return (
        <main>
            {store.isLoading && <p>Loading...</p>}
            {store.error && <p>Error: {store.error}</p>}
            {!store.isLoading && store.checkoutDetails && (
                <CheckoutSection checkoutDetails={store.checkoutDetails} title={title}/>
            )}
        </main>
    );
});

export default function Checkout({ title }) {
    return (
        <CheckoutStoreProvider>
            <CheckoutContent title={title}/>
        </CheckoutStoreProvider>
    );
}
