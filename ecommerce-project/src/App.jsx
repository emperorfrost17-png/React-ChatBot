import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    //This tells React all the pgaes that are in our website
    <Routes>
      {/*This adds a page to our website
      It takes two props
      1. path props is for the URL path of the page. for it to be empty just put "/" or just use the index prop it is the same
      2. element props tells React which element or component to display e.g <HomePage />

      N/B: All these Routes linked share one HTML file which is index.html
      */}
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="Tracking" element={<TrackingPage />} />
      {/*In React Router, path="*" is a catch-all route that matches any URL that hasn't been matched by previous route definitions. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
