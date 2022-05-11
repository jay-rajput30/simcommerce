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
import { useAuth } from "../../providers/AuthProvider";

let activeLink = {
  fontWeight: "bold",
};
const NavItems = () => {
  const { loginStatus } = useAuth();
  return (
    <div className="nav--items--container">
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink
          style={({ isActive }) => (isActive ? activeLink : undefined)}
          to="/"
        >
          <FaHome />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink to="/product">
          <FaSearch />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink to="/wishlist">
          <FaHeart />
        </NavLink>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "nav--item" }}>
        <NavLink to="/cart">
          <FaShoppingCart />
        </NavLink>
      </IconContext.Provider>
      {loginStatus || (
        <IconContext.Provider value={{ className: "nav--item" }}>
          <NavLink to="/login">
            <FaUser />
          </NavLink>
        </IconContext.Provider>
      )}
    </div>
  );
};

export default NavItems;
