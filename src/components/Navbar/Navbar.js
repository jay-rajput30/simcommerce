import { NavLink } from "react-router-dom";
// import Products from "../Products/Products";
// import Wishlist from "../Wishlist";
// import Cart from "../Cart";
import "./Navbar.css";
// import { FaBars } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { useState } from "react";
// import NavItems from "../NavItems/NavItems";

const Navbar = ({ route, setRoute }) => {
  // const [toggleBar, setToggleBar] = useState(true);

  // const toggleHandler = () => {
  //   setToggleBar(!toggleBar);
  // };
  return (
    <nav className="sticky--nav navbar">
      <div className="nav--header">
        <h3 onClick={() => setRoute("landing")}>
          <NavLink
            style={{
              cursor: "pointer",
              color: "var(--secondary-color",
              fontSize: "var(--length-lg1)",
            }}
            activeClassName="active--link"
            to="/"
          >
            SimCommerce
          </NavLink>
        </h3>
        {/* <FaBars className="bar--icon" onClick={toggleHandler} /> */}
      </div>
      {/* <NavItems /> */}
      {/* <ul className={`${toggleBar ? "nav--list show" : "nav--list"}`}> */}
      {/* <li onClick={() => setRoute("product")} className="nav--items">
          <NavLink activeClassName="active--link" to="/product">
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
        </li> */}
      {/* </ul> */}
    </nav>
  );
};

export default Navbar;
