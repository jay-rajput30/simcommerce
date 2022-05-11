import { useProduct } from "../../../providers/ProductProvider";
import "./Products.css";
import ProductCard from "./ProductCard/ProductCard";
// import { useData } from "../../../providers/DataProvider";
const Products = ({ showToast, setShowToast, message, setMessage }) => {
  // const { wishlistItems } = useData();
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

  return (
    <div className="product--container">
      <section className="products--section">
        {filteredData.map((item) => {
          return (
            <ProductCard
              key={item._id}
              item={item}
              showToast={showToast}
              setShowToast={setShowToast}
              message={message}
              setMessage={setMessage}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Products;
