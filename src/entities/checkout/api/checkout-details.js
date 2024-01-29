import { makeAutoObservable } from "mobx";

class CheckoutStore {
  checkoutDetails = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCheckoutDetails(staticCode) {
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${staticCode}`;
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
