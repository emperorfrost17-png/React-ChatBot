import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";
import CheckMarkIcon from "../../assets/images/icons/checkmark.png";
export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = async () => {
    //!  .post() is for creating data in the backend
    //the second parameter in post() is called the request body for sending information to the backend
    await axios.post("/api/cart-items", {
      productId: product.id,
      //the code below is the same as quantity: quantity
      //this is a shorthand property syntax
      quantity,
    });
    await loadCart();
    setAdded(true);

    //this makes added message disappear after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };
  const selectQuantity = (event) => {
    //value = current selected value shown in the input and updates after onChange
    //onChange = update state when the user picks a different option and the new state will show in the value

    //it is called controlled input
    // Number() is for converting the selected number from a string to a number
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };
  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          //this lets us find the image element in our test
          data-testid="product-image"
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="product-rating"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
        <img src={CheckMarkIcon} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
