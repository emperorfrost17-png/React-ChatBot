import { useNavigate, useSearchParams } from "react-router";
import { NavLink } from "react-router";
import { useState } from "react";
import "./Header.css";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";

export function Header({ cart }) {
  const navigate = useNavigate();
  //This gets the text from the search
  const [searchParams] = useSearchParams();

  // Search flow step 1:
  // Read the current search text from the URL.
  // Example: /?search=shirt gives us "shirt".
  const search = searchParams.get("search");

  // Search flow step 2:
  // Store what the user types into the search bar.
  // If the page already has a search in the URL, use it as the starting value.
  const [searchInput, setSearchInput] = useState(search || '');
  const inputText = (event) => {
    setSearchInput(event.target.value);
  };

  // Search flow step 3:
  // When the search button is clicked, go to the home page and save the
  // search text in the URL. This lets HomePage read it and fetch matching products.
  const searchProducts = () => {
    //! '/' navigates to the home page
    //! '?search=${search}' saves the search text in the URL so we can share it between pages
    navigate(`/?search=${searchInput}`);
  };
  let totalQuantity = 0;

  if (cart) {
    //This is for calculating the cart quantity
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
  }

  return (
    <div className="header">
      <div className="left-section">
        {/* NavLink component helps us go to another page without reloading. it is better to use this rather than using a tags because a tags reload the page */}

        {/*But it has a special feature. The special feature is that it knows which page is loaded . For example, If you're on the Orders page, it adds a class called active to the Orders link (className="orders-link ... active"). */}
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={inputText}
        />

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
