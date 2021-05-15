import { NavLink } from "react-router-dom";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

const Navbar = ({ route, setRoute }) => {
  return (
    <>
      <nav className="sticky--nav">
        <h3 className="nav--hero">SimCommerce</h3>
        <ul className="nav--list">
          <li onClick={() => setRoute("product")} className="nav--items">
            <NavLink activeClassName="active--link" to="/">
              product
            </NavLink>
          </li>
          <li onClick={() => setRoute("wishlist")} className="nav--items">
            <NavLink activeClassName="active--link" to="/wishlist">
              wishlist
            </NavLink>
          </li>
          <li onClick={() => setRoute("cart")} className="nav--items">
            <NavLink activeClassName="active--link" to="/cart">
              cart
            </NavLink>
          </li>
          <li onClick={() => setRoute("login")} className="nav--items">
            <NavLink activeClassName="active--link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
