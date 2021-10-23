import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  const buttonClickHandler = (e) => {
    e.preventDefault();
    navigate("/product");
  };
  return (
    <>
      <h3>show categories here</h3>
      <button onClick={buttonClickHandler}>start shopping</button>
    </>
  );
};

export default Landing;
