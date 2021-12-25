// import axios from "axios";
import "./WishlistContainer.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
import { deleteAxiosCall } from "../../services/deleteAxiosCall";
import { getAxiosCall } from "../../services/getAxiosCall";
import { updateAxiosCall } from "../../services/updateAxiosCall";
import WishlistCard from "./WishlistCard/WishlistCard";
import ToastMessage from "../ToastMessage/ToastMessage";

const WishlistContainer = () => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();
  const { userId, wishlistId, cartId, authDispatch, token } = useAuth();
  const URL = `http://localhost:3001/wishlist/singlewishlist`;

  const removeWishlistItemClickHandler = async (item) => {
    // dataDispatch({ type: "WISHLIST_REMOVE", payload: item });
    // console.log({ name: item["name"] });
    setMessage("item removed from wishlist");
    setShowToast(true);
    try {
      // console.log({ wishlistId: wishlistId, item: item });
      const data = await deleteAxiosCall(
        `http://localhost:3001/wishlist/removeitem`,
        item["_id"],
        token
      );
      const wishlistProducts = data.wishlistItem.products;
      // console.log({ wishlistProducts });
      setFetchWishlist(wishlistProducts);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function getwishlist() {
      try {
        let { data } = await getAxiosCall(URL, token);

        const wishlistProducts = data.wishlistItem.products.reduce(
          (acc, cur) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            return acc;
          },
          {}
        );

        setFetchWishlist([...fetchWishlist, ...Object.keys(wishlistProducts)]);
        console.log({ fetchWishlist });
        dataDispatch({ type: "LOAD_WISHLIST", payload: fetchWishlist });
        authDispatch({
          type: "SET_WISHLISTID",
          payload: data.wishlistItem._id,
        });
      } catch (e) {
        console.error(e);
      }
    }
    getwishlist();
  }, []);

  const userWishlist = fetchWishlist.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );
  return (
    <section className="wishlist--container">
      {userWishlist.map((item) => {
        return (
          <WishlistCard
            item={item}
            fetchWishlist={fetchWishlist}
            setFetchWishlist={setFetchWishlist}
            removeWishlistItemClickHandler={removeWishlistItemClickHandler}
            showToast={showToast}
            setShowToast={setShowToast}
            message={message}
            setMessage={setMessage}
          />
        );
      })}
      {showToast && (
        <ToastMessage message={message} setShowToast={setShowToast} />
      )}
    </section>
  );
};

export default WishlistContainer;
