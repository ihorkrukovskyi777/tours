import { makeAutoObservable } from "mobx";

class CheckoutStore {


  constructor() {
    this.checkoutDetails = null;
    this.isLoading = false;
    this.error = null;
    makeAutoObservable(this);
  }

  setLoading(value = true) {
    this.isLoading = value;
  }
  setDetails(details) {
    this.checkoutDetails = details;
  }
  setError(error) {
    this.error = error;
  }
  * fetchCheckoutDetails(staticCode) {
    const url = `${process.env.NEXT_PUBLIC_WORDPRESS}/wp-json/oneport/v1/checkout/${staticCode}`;
    this.setLoading(true)
    this.error = null;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.setDetails(data)
      })
      .catch((err) => {
        this.setError(err.message)
      })
      .finally(() => {
        this.setLoading(false)
      });
  }
}

export const checkoutStore = new CheckoutStore();
