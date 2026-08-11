import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { formatMoney } from "../utils/money";
import "./HomePage.css";
import CheckMarkIcon from "../assets/images/icons/checkmark.png";
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //This is to get data from the backend
    //The string is for the URL where we are fetching the data from
    //N:B returns a Promise and a Promise lets us wait for asynchronous code to finsish
    //when it finishes in the future it runs the function in .then()

    //The difference between fetch() and axios.get() is that for axios, the data  will be saved directly into the response directly while for fetch it isn't
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              //Never forget that when you loop through an array each element needs a key prop
              //React uses the key prop to identify which items in a list have changed, been added, or removed.
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  {formatMoney(product.priceCents)}
                </div>

                <div className="product-quantity-container">
                  <select>
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

                <div className="added-to-cart">
                  <img src={CheckMarkIcon} />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
