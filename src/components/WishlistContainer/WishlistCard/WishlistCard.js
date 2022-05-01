import { Link } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useData } from "../../../providers/DataProvider";

import { updateAxiosCall } from "../../../services/updateAxiosCall";

const WishlistCard = ({
  item,
  fetchWishlist,
  setFetchWishlist,
  removeWishlistItemClickHandler,
  showToast,
  setShowToast,
  message,
  setMessage,
}) => {
  const { dataDispatch } = useData();
  const { token } = useAuth();

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
          <Link classname="view--detail" to={`/product/${item.id}`}>
            view more
          </Link>
        </div>

        <button
          onClick={async () => {
            dataDispatch({ type: "CART_ADD", payload: item });
            setMessage("item added to cart");
            setShowToast(true);
            try {
              const data = await updateAxiosCall(
                `https://simcombe.herokuapp.com/cart/`,
                item["_id"],
                token
              );
            } catch (e) {
              console.error(e);
            }
          }}
          className="button primary--button"
        >
          add to cart
        </button>
        <button
          onClick={() => removeWishlistItemClickHandler(item)}
          className="button secondary--button"
        >
          remove
        </button>
      </div>
    </article>
  );
};

export default WishlistCard;
