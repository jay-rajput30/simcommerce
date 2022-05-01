import "./ProductCard.css";

import { useData } from "../../../../providers/DataProvider";
import { updateAxiosCall } from "../../../../services/updateAxiosCall";
import { useAuth } from "../../../../providers/AuthProvider";
import { Link } from "react-router-dom";

const ProductCard = ({
  item,
  showToast,
  setShowToast,
  message,
  setMessage,
}) => {
  const { dataDispatch } = useData();
  const { token } = useAuth();

  // const findWishlistedItem = (item) => {
  //   return wishlistItems.find(
  //     (i) => item.id === i.id && i.isWishlisted === true
  //   );
  // };

  const addWishlistBtnClickHandler = async () => {
    setMessage("item added to wishlist");
    setShowToast(true);
    if (item.outOfStock === false) {
      dataDispatch({ type: "WISHLIST_ADD", payload: item });
      try {
        const data = await updateAxiosCall(
          `https://simcombe.herokuapp.com/wishlist`,
          item["_id"],
          token
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addCartBtnClickHandler = async () => {
    setMessage("item added to cart");
    setShowToast(true);
    try {
      const data = await updateAxiosCall(
        `https://simcombe.herokuapp.com/cart`,
        item["_id"],
        token
      );
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <article className="card">
      <div className="card--top">
        <img
          style={{ aspectRatio: "4/3", width: "100%", objectFit: "cover" }}
          src={item["imageUrl"]}
          alt={`${item["imageUrl"]}`}
        />
        <span className="card--top--text">{item.name}</span>
      </div>

      <div className="card--bottom">
        <div className="card--details--container">
          <p>Rs.{item["price"]}</p>
          {/* <p>{item.outOfStock ? "out of stock" : "in stock"}</p>
          <p>{item.fastDelivery ? "fast delivery" : null}</p> */}
          <Link classname="view--detail" to={`/product/${item.id}`}>
            view more
          </Link>
        </div>

        <button
          onClick={addWishlistBtnClickHandler}
          className={`${
            item.outOfStock === true
              ? "button primary--button disabled"
              : "button primary--button"
          }`}
        >
          add to wishlist
        </button>
        <button
          onClick={addCartBtnClickHandler}
          className={`${
            item.outOfStock === true
              ? "button primary--button disabled"
              : "button primary--button"
          }`}
        >
          add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
