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

    //The difference between fetch() and axios.get() is that for axios, the data  will be saved directly into the response directly while for fetch it isn't

    //to use async await in useEffect you need to create a new function inside useEffect and then run the function
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    getHomeData();
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
