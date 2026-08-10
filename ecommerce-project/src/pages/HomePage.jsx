import { Header } from "../components/Header";
import { products } from "../../starting-code/data/products";
import "./HomePage.css";
import CheckMarkIcon from "../assets/images/icons/checkmark.png";
export function HomePage() {
  //This is to get data from the backend
  //The string is for the URL where we are fetching the data from
  //N:B returns a Promise and a Promise lets us wait for asynchronous code to finsish
  //when it finishes in the future it runs the function in .then()
  fetch("http://localhost:3000/api/products").then((response) => {
    //.json() gives us the data attached to the response
    //it is also asychronous just like fetch response and also a promise
   return response.json()
  }).then((data) => {
      console.log(data);
    });;
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
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
                  ${(product.priceCents / 100).toFixed(2)}
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
