"use client";
import React, { createContext } from "react";
import CheckoutStore from "@/entities/checkout/store/checkout";

// Create a Context for the CheckoutStore
export const CheckoutStoreContext = createContext(null);

// Provider Component for the CheckoutStore
export const CheckoutStoreProvider = ({ children, locale }) => {
  return (
    <CheckoutStoreContext.Provider value={new CheckoutStore(locale)}>
      {children}
    </CheckoutStoreContext.Provider>
  );
};
