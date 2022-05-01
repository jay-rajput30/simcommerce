import Navbar from "../components/Navbar/Navbar";
import ProductViewContainer from "../components/ProductViewContainer/ProductViewContanier";
const ProductView = ({ route, setRoute }) => {
  return (
    <>
      <Navbar route={route} setRoute={setRoute} />
      <ProductViewContainer />
    </>
  );
};

export default ProductView;
