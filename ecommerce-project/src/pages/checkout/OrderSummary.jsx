import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

import { DeliveryOptions } from "./DeliveryOptions";
export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          //!  .find() runs a provided function on each element in the array. The first element for which this function returns true is the one returned by .find().
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            //Never forget that when you loop through an array each element needs a key prop
            //React uses the key prop to identify which items in a list have changed, been added, or removed.
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
