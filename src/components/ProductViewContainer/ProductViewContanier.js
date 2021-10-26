import DesktopFilter from "./DesktopFilter/DesktopFilter";
import Products from "./Products/Products";
import "./ProductViewContainer.css";
import { useState } from "react";
import MobileFilter from "./MobileFilter/MobileFilter";

const ProductViewContainer = () => {
  const [showFilter, setShowFilter] = useState(false);
  const showFilterBtnHandler = () => {
    setShowFilter(true);
  };
  const hideFilter = () => {
    setShowFilter(false);
  };
  return (
    <div className="product--view--container">
      <DesktopFilter />
      <Products />
      <button className="floating--button" onClick={showFilterBtnHandler}>
        +
      </button>
      {showFilter && <MobileFilter hideFilter={hideFilter} />}
    </div>
  );
};

export default ProductViewContainer;
