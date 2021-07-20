import "./NavItems.css";
import { FaHome, FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const NavItems = () => {
  return (
    <div className="nav--items--container">
      <div className="nav--items">
        <FaHome
          className="nav--item home--item"
          style={{
            border: "2px solid gray",
            marginLeft: "1rem",
            padding: "1rem",
            width: "1rem",
            color: "#4338ca",
          }}
        />
        <FaSearch
          className="nav--item search--item"
          style={{
            border: "2px solid gray",
            marginLeft: "1rem",
            padding: "1rem",
            width: "1rem",
            color: "#4338ca",
          }}
        />
        <FaHeart
          className="nav--item heart--item"
          style={{
            border: "2px solid gray",
            marginLeft: "1rem",
            padding: "1rem",
            width: "1rem",
            color: "#4338ca",
          }}
        />
        <FaShoppingCart
          className="nav--item cart--item"
          style={{
            border: "2px solid gray",
            marginLeft: "1rem",
            padding: "1rem",
            width: "1rem",
            color: "#4338ca",
          }}
        />
      </div>
    </div>
  );
};

export default NavItems;
