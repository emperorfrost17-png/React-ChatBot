import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

function App() {
  //! This under is called lifting the state up because the cart was first in HomePage.jsx and i removed it from there and put it in App.jsx then later shared cart between HomePage.jsx and CheckoutPage.jsx by defining cart as prop for both jsx files

  //so that is how you lift a state up
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //This for fetching the cart data

    //  ?expand=product is a Query Parameter it lets us add additional info to our request
    //! When the backend receives this Query Paramter it is going to add product details to the cart

    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    //This tells React all the pgaes that are in our website
    <Routes>
      {/*This adds a page to our website
      It takes two props
      1. path props is for the URL path of the page. for it to be empty just put "/" or just use the index prop it is the same
      2. element props tells React which element or component to display e.g <HomePage />

      N/B: All these Routes linked share one HTML file which is index.html
      */}
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="Tracking" element={<TrackingPage />} />
      {/*In React Router, path="*" is a catch-all route that matches any URL that hasn't been matched by previous route definitions. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
