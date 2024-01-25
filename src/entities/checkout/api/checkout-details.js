import { makeAutoObservable } from "mobx";

class CheckoutStore {
  checkoutDetails = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCheckoutDetails() {
    const staticCode = "669fbb5c1d8f866051835a2d7a61b4f802128535";
    const url = `${process.env.NEXT_PUBLIC_CHECKOUT_DETAILS_API}/${staticCode}`;
    this.isLoading = true;
    this.error = null;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.checkoutDetails = data;
      })
      .catch((err) => {
        this.error = err.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export const checkoutStore = new CheckoutStore();
