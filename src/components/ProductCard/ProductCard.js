import "./ProductCard.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useData } from "../../DataProvider";

const ProductCard = ({ item }) => {
  const { wishlistItems, dataDispatch } = useData();

  const findWishlistedItem = (item) => {
    return wishlistItems.some(
      (i) => item.id === i.id && i.isWishlisted === true
    );
  };

  return (
    <article className="card">
      <div className="card--top">
        <img
          style={{ width: "100%", objectFit: "cover" }}
          src={item["imageUrl"]}
          alt={`${item["imageUrl"]}`}
        />
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
          <p>{item["price"]}</p>
          <p>{item.outOfStock ? "out of stock" : "in stock"}</p>
          <p>{item.fastDelivery ? "fast delivery" : null}</p>
        </div>

        <button
          onClick={() => {
            if (item.inStock) {
              dataDispatch({ type: "WISHLIST_ADD", payload: item });
            }
          }}
          className={`${
            item.inStock === true
              ? "button primary--button"
              : "button primary--button disabled"
          }`}
        >
          {findWishlistedItem(item) ? "go to wishlist" : "add to wishlist"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
