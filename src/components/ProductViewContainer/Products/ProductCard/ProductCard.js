import "./ProductCard.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useData } from "../../../../DataProvider";
import { updateAxiosCall } from "../../../../services/updateAxiosCall";
import { useAuth } from "../../../../AuthProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCard = ({
  item,
  showToast,
  setShowToast,
  message,
  setMessage,
}) => {
  const { wishlistItems, dataDispatch } = useData();
  const { userId, wishlistId, cartId, token } = useAuth();
  console.log({ token });
  const findWishlistedItem = (item) => {
    return wishlistItems.find(
      (i) => item.id === i.id && i.isWishlisted === true
    );
  };

  const addWishlistBtnClickHandler = async () => {
    setMessage("item added to wishlist");
    setShowToast(true);
    if (item.outOfStock === false) {
      dataDispatch({ type: "WISHLIST_ADD", payload: item });

      try {
        const data = await updateAxiosCall(
          `http://localhost:3001/wishlist/${userId}`,
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
        `http://localhost:3001/cart/${userId}`,
        item["_id"],
        {
          headers: {
            authorization: token,
          },
        }
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
      {/* <span
        style={{ backgroundColor: "white", background: "transparent" }}
        className="badge card--badge"
        onClick={() => {
          if (item.outOfStock) {
            dataDispatch({ type: "WISHLIST_ADD", payload: item });
          }
        }}
      >
        {
          // findWishlistedItem(item) ? (
          //   <FcLike style={{ fontSize: "1.5rem" }} />
          // ) : (
          <AiOutlineHeart style={{ fontSize: "1.5rem" }} />
        }
      </span> */}
      <div className="card--bottom">
        <div className="card--details--container">
          <p>Rs.{item["price"]}</p>
          {/* <p>{item.outOfStock ? "out of stock" : "in stock"}</p>
          <p>{item.fastDelivery ? "fast delivery" : null}</p> */}
          <Link classname="view--detail" to="/product/${item.id}">
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
