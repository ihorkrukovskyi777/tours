"use client";
import React, { createContext } from "react";
import { checkoutStore } from "../api/checkout-details";

// Create a Context for the CheckoutStore
export const CheckoutStoreContext = createContext(null);

// Provider Component for the CheckoutStore
export const CheckoutStoreProvider = ({ children }) => {
  return (
    <CheckoutStoreContext.Provider value={checkoutStore}>
      {children}
    </CheckoutStoreContext.Provider>
  );
};
