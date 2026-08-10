import { NavLink } from "react-router";
import "./Header.css";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";

export function Header({ cart }) {
  let totalQuantity = 0

  //This is for calculating the cart quantity
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity
  })
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
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
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
