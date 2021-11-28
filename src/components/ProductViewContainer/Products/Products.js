// import { useData } from "../../DataProvider";
import { useProduct } from "../../../ProductProvider";
import "./Products.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import ProductCard from "./ProductCard/ProductCard";
import { useData } from "../../../DataProvider";

const Products = ({ route, setRoute }) => {
  const { wishlistItems } = useData();
  const { productData, sortBy, showFastDelivery } = useProduct();

  const sortData = (productData, sortBy) => {
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return productData.sort((a, b) => b["price"] - a["price"]);
    }
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return productData.sort((a, b) => a["price"] - b["price"]);
    }
    return productData;
  };

  const filterData = (productData, fastDelivery) => {
    return productData.filter(({ fastDelivery }) =>
      showFastDelivery ? fastDelivery : true
    );
  };

  const sortedData = sortData(productData, sortBy);
  let filteredData = filterData(sortedData, { showFastDelivery });

  const findWishlistedItem = (item) => {
    return wishlistItems.some(
      (i) => item.id === i.id && i.isWishlisted === true
    );
  };
  return (
    <div className="product--container">
      <section className="products--section">
        {filteredData.map((item) => {
          return <ProductCard item={item} />;
        })}
      </section>
    </div>
  );
};

export default Products;
