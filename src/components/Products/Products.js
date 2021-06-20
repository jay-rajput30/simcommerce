import { useEffect, useState } from "react";
import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
import "./Products.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";


const Products = ({ route, setRoute }) => {
  // const [wishlisted, setWishlisted] = useState();
  // console.log(wishlisted);
 
  const { data, sortBy, showFastDelivery, showOutOfStock, dispatch } =
    useProduct();

  const { wishlistItems, cartItems, dataDispatch } = useData();
  const sortData = (productList, sortBy) => {
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  };

  const filterData = (productList, fastDelivery, outOfStock) => {
    return productList
      .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
      .filter(({ inStock }) => (showOutOfStock ? true : inStock));
  };

  const sortedData = sortData(data, sortBy);

  let filteredData = filterData(sortedData, {
    showFastDelivery,
    showOutOfStock,
  });

  const findWishlistedItem = (item) => {
    return wishlistItems.some(
      (i) => item.id === i.id && i.isWishlisted === true
    );

    // itemWishlisted ? setWishlisted(true) : setWishlisted(false);
  };

  return (
    <div className="product--container">
      <section className="filter--options">
        <div classname="price--sort">
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
          <div className="filter--options__item">
            <input
              onChange={() => dispatch({ type: "OUT_OF_STOCK" })}
              type="checkbox"
              id="out_of_stock"
              name="out_of_stock"
              value="out of stock"
            />
            <label htmlFor="out_of_stock">remove out of stock</label>
          </div>
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
          {"       "}
        </div>
      </section>

      <section className="products--section">
        {filteredData.map((item) => {
          return (
            <article className="card">
              <div className="card--top">
                <img src={item.image} alt={`${item.image}`} />
                <span className="card--top--text">{item.name}</span>
              </div>
              <span
                style={{ backgroundColor: "white", background: "transparent" }}
                className="badge card--badge"
                onClick={() => {
                  if (item.inStock) {
                    dataDispatch({ type: "WISHLIST_ADD", payload: item });
                  }
                }}
              >
                {findWishlistedItem(item) ? (
                  <FcLike style={{ fontSize: "1.5rem" }} />
                ) : (
                  <AiOutlineHeart style={{ fontSize: "1.5rem" }} />
                )}
              </span>
              <div className="card--bottom">
                <div>
                  <p>{item.price}</p>
                  <p>{item.inStock ? "in stock" : "out of stock"}</p>
                  <p>{item.fastDelivery ? "fast delivery" : null}</p>
                </div>

                <button
                  onClick={() => {
                    if (item.inStock) {
                      dataDispatch({ type: "WISHLIST_ADD", payload: item });
                    }
                  }}
                  className="button primary--button"
                >
                  {findWishlistedItem(item)
                    ? "go to wishlist"
                    : "add to wishlist"}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Products;