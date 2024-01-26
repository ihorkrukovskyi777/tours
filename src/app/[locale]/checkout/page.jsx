"use client";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  CheckoutStoreContext,
  CheckoutStoreProvider,
} from "@/entities/checkout/store/checkout-store";
import CheckoutSection from "@/entities/checkout/ui";
import OtherTours from "@/widgets/other-tours";
import ChangeOfLanguage from "@/shared/ui/languages/change-of-language/change-of-language";

const CheckoutContent = observer(() => {
  const store = useContext(CheckoutStoreContext);

  useEffect(() => {
    if (!store.checkoutDetails) {
      store.fetchCheckoutDetails();
    }
  }, [store]);

  return (
    <main>
      {store.isLoading && <p>Loading...</p>}
      {store.error && <p>Error: {store.error}</p>}
      {!store.isLoading && store.checkoutDetails && (
        <CheckoutSection checkoutDetails={store.checkoutDetails} />
      )}
      <OtherTours />
      <ChangeOfLanguage />
    </main>
  );
});

export default function Checkout() {
  return (
    <CheckoutStoreProvider>
      <CheckoutContent />
    </CheckoutStoreProvider>
  );
}
