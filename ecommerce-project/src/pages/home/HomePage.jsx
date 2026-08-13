import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
import CheckMarkIcon from "../../assets/images/icons/checkmark.png";
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
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
