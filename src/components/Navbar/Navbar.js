import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ route, setRoute }) => {
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
            to="/"
          >
            SimCommerce
          </NavLink>
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
