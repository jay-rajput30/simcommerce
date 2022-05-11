import { useNavigate } from "react-router";
import Categories from "./Categories/Categories";
import "./Landing.css";
const Landing = () => {
  const navigate = useNavigate();

  const buttonClickHandler = (e) => {
    e.preventDefault();
    navigate("/product");
  };
  return (
    <>
      <h2>your one stop shop for cricket products</h2>
      <Categories />
      <div className="btn-container">
        <button className="button primary--button" onClick={buttonClickHandler}>
          start shopping
        </button>
      </div>
    </>
  );
};

export default Landing;
