import DesktopFilter from "./DesktopFilter/DesktopFilter";
import Products from "./Products/Products";

const ProductViewContainer = () => {
  return (
    <div className="product--view--container">
      <DesktopFilter />
      <Products />
    </div>
  );
};

export default ProductViewContainer;
