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
import {useSearchParams} from "next/navigation";

const CheckoutContent = observer(() => {
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
