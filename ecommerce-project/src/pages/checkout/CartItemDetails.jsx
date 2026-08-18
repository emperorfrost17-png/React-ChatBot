import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
export function CartItemDetails({ cartItem, loadCart }) {
  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  // update starts as false, so the normal quantity text is shown.
  // When Update is clicked, updateQuantity checks the current update value.
  // If update is true, setUpdate(false) turns update mode off and hides the input.
  // If update is false, setUpdate(true) turns update mode on and shows the input.
  // So this if/else works like a toggle switch.
  const updateQuantity = async () => {
    if (update) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity,
      });
      setUpdate(false);
      await loadCart();
    } else {
      setUpdate(true);
    }
  };
  const updateQuantityInput = (event) => {
    setQuantity(Number(event.target.value));
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      updateQuantity();
    }
    if (event.key === "Escape") {
      setQuantity(cartItem.quantity)
      setUpdate(false)
    }
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {update ? (
              <input
                className="update-text-box"
                type="text"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            onClick={updateQuantity}
            className="update-quantity-link link-primary"
          >
            Update
          </span>
          <span
            onClick={deleteCartItem}
            className="delete-quantity-link link-primary"
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
