"use client";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
    CheckoutStoreContext,
    CheckoutStoreProvider,
} from "@/entities/checkout/store/checkout-store";
import CheckoutSection from "@/entities/checkout/ui";
import {useSearchParams} from "next/navigation";

const CheckoutContent = observer(({ title, checkoutData }) => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code');

    const store = useContext(CheckoutStoreContext);
    useEffect(() => {

        console.log(code, 'code')
        store.setDetails(checkoutData)
        //store.fetchCheckoutDetails(searchParams.get('code'));
    }, []);

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

export default function Checkout({ title , checkoutData }) {
    return (
        <CheckoutStoreProvider>
            <CheckoutContent title={title} checkoutData={checkoutData}/>
        </CheckoutStoreProvider>
    );
}
