import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
// import { useAuth } from "../../AuthProvider";
import { useData } from "../../../DataProvider";
import { useProduct } from "../../../ProductProvider";
import { deleteAxiosCall } from "../../../services/deleteAxiosCall";
import { getAxiosCall } from "../../../services/getAxiosCall";
import { updateAxiosCall } from "../../../services/updateAxiosCall";

const WishlistCard = ({ item, fetchWishlist, setFetchWishlist }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  // const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, wishlistId, cartId, authDispatch } = useAuth();

  const removeWishlistItemClickHandler = async () => {
    // dataDispatch({ type: "WISHLIST_REMOVE", payload: item });
    try {
      const data = await deleteAxiosCall(
        `http://localhost:3001/wishlist/${wishlistId}`,
        item["_id"]
      );
      const wishlistProducts = data.wishlistItem.products;
      setFetchWishlist((prev) => wishlistProducts);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <article key={item._id} className="card">
      <div className="card--top">
        <img
          style={{ width: "100%", objectFit: "cover" }}
          src={item["imageUrl"]}
          alt={`${item["imageUrl"]}`}
        />
        <span className="card--top--text">{item["name"]}</span>
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
          onClick={async () => {
            dataDispatch({ type: "CART_ADD", payload: item });

            try {
              console.log(cartId, item["_id"]);
              const data = await updateAxiosCall(
                `http://localhost:3001/cart/${cartId}`,
                item["_id"]
              );
              const cartProducts = data.cartItem.products;
              console.log(cartProducts);
            } catch (e) {
              console.error(e);
            }
          }}
          className="button primary--button"
        >
          add to cart
        </button>
        <button
          onClick={removeWishlistItemClickHandler}
          className="button secondary--button"
        >
          remove
        </button>
      </div>
    </article>
  );
};

export default WishlistCard;
