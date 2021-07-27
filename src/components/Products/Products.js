import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
import "./Products.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import ProductCard from "../ProductCard/ProductCard";

const Products = ({ route, setRoute }) => {
  const { wishlistItems, dataDispatch } = useData();
  const { productData, sortBy, showFastDelivery, dispatch } = useProduct();

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data } = await axios.get("http://localhost:3001/product");
  //     setProductData([...data.products]);
  //   }
  //   fetchData();
  // }, []);

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
      {console.log({ productData, filterData })}
      <section className="filter--options">
        <div className="price--sort">
          <div className="filter--options__item">
            {" "}
            <input
              onChange={() =>
                dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
              }
              type="radio"
              name="price--sort"
              id="high--to--low"
              checked={sortBy && sortBy === "HIGH_TO_LOW"}
            />
            <label htmlFor="high--to--low">high to low</label>
          </div>
          <div className="filter--options__item">
            <input
              onChange={() =>
                dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
              }
              type="radio"
              name="price--sort"
              id="low--to--high"
              checked={sortBy && sortBy === "LOW_TO_HIGH"}
            />
            <label htmlFor="low--to--high">low to high</label>
          </div>
          {"    "}
        </div>
        <div className="delivery--sort">
          {/* <div className="filter--options__item">
            <input
              onChange={() => dispatch({ type: "OUT_OF_STOCK" })}
              type="checkbox"
              id="out_of_stock"
              name="out_of_stock"
              value="out of stock"
            />
            <label htmlFor="out_of_stock">remove out of stock</label>
          </div> */}
          <div className="filter--options__item">
            <input
              onChange={() => dispatch({ type: "FAST_DELIVERY" })}
              type="checkbox"
              id="fast_delivery"
              name="fast_delivery"
              value="fast_delivery"
            />
            <label htmlFor="fast_delivery">fast delivery</label>
          </div>
        </div>
      </section>

      <section className="products--section">
        {filteredData.map((item) => {
          {
            // console.log(item);
          }
          return (
            <ProductCard item={item} />
            // <article className="card">
            //   <div className="card--top">
            //     <img
            //       style={{ width: "100%", objectFit: "cover" }}
            //       src={item["imageUrl"]}
            //       alt={`${item["imageUrl"]}`}
            //     />
            //     <span className="card--top--text">{item.name}</span>
            //   </div>
            //   <span
            //     style={{ backgroundColor: "white", background: "transparent" }}
            //     className="badge card--badge"
            //     onClick={() => {
            //       if (item.inStock) {
            //         dataDispatch({ type: "WISHLIST_ADD", payload: item });
            //       }
            //     }}
            //   >
            //     {findWishlistedItem(item) ? (
            //       <FcLike style={{ fontSize: "1.5rem" }} />
            //     ) : (
            //       <AiOutlineHeart style={{ fontSize: "1.5rem" }} />
            //     )}
            //   </span>
            //   <div className="card--bottom">
            //     <div>
            //       <p>{item["price"]}</p>
            //       <p>{item.outOfStock ? "out of stock" : "in stock"}</p>
            //       <p>{item.fastDelivery ? "fast delivery" : null}</p>
            //     </div>

            //     <button
            //       onClick={() => {
            //         if (item.inStock) {
            //           dataDispatch({ type: "WISHLIST_ADD", payload: item });
            //         }
            //       }}
            //       className={`${
            //         item.inStock === true
            //           ? "button primary--button"
            //           : "button primary--button disabled"
            //       }`}
            //     >
            //       {findWishlistedItem(item)
            //         ? "go to wishlist"
            //         : "add to wishlist"}
            //     </button>
            //   </div>
            // </article>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
