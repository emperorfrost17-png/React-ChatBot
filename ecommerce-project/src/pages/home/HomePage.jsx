import axios from "axios";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
import CheckMarkIcon from "../../assets/images/icons/checkmark.png";
export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  //This gets the search text
  const [searchParams] = useSearchParams();

  // Search flow step 4:
  // HomePage reads the search text from the URL.
  // Example: /?search=shirt makes search equal to "shirt".
  const search = searchParams.get("search");

  useEffect(() => {
    //This is to get data from the backend
    //The string is for the URL where we are fetching the data from

    //The difference between fetch() and axios.get() is that for axios, the data  will be saved directly into the response directly while for fetch it isn't

    //to use async await in useEffect you need to create a new function inside useEffect and then run the function
    const getHomeData = async () => {
      // Search flow step 5:
      // If there is search text, ask the backend for matching products.
      // If there is no search text, ask the backend for all products.
      const urlPath = search
        ? `/api/products?search=${search}`
        : `/api/products`;

      // Search flow step 6:
      // Save the products returned by the backend into React state.
      // Updating this state makes ProductsGrid display the new results.
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    // Search flow step 7:
    // This runs when HomePage first loads and whenever the URL search text changes.
    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} cart={cart} />
      </div>
    </>
  );
}
