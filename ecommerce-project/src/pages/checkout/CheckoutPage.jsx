import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";

import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";
export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      // Fetch checkout data in parallel because delivery options and payment summary
      // do not depend on each other. This is faster than waiting for one request
      // to finish before starting the next one.
      const [deliveryOptionsResponse, paymentSummaryResponse] =
        await Promise.all([
          axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
          axios.get("/api/payment-summary"),
        ]);

      setDeliveryOptions(deliveryOptionsResponse.data);
      setPaymentSummary(paymentSummaryResponse.data);
    };
    fetchCheckoutData();
  }, []);
  return (
    <>
      {/*This is for the Checkout Page to have a different title */}
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
