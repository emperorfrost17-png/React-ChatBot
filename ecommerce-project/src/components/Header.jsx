import { NavLink } from "react-router";
import "./Header.css";
export function Header() {
  return (
    <div className="header">
      <div className="left-section">
        {/* NavLink component helps us go to another page without reloading. it is better to use this rather than using a tags because a tags reload the page */}

        {/*But it has a special feature. The special feature is that it knows which page is loaded . For example, If you're on the Orders page, it adds a class called active to the Orders link (className="orders-link ... active"). */}
        <NavLink to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
