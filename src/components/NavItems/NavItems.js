import "./NavItems.css";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const NavItems = () => {
  const { loggedIn } = useAuth();
  return (
    <div className="nav--items--container">
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink activeClassName="active--link" to="/">
          <FaHome />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink activeClassName="active--link" to="/product">
          <FaSearch />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink activeClassName="active--link" to="/wishlist">
          <FaHeart />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink activeClassName="active--link" to="/cart">
          <FaShoppingCart />
        </NavLink>
      </IconContext.Provider>
      {loggedIn.status || (
        <IconContext.Provider value={{ className: "nav--item" }}>
          <NavLink activeClassName="active--link" to="/login">
            <FaUser />
          </NavLink>
        </IconContext.Provider>
      )}
    </div>
  );
};

export default NavItems;
