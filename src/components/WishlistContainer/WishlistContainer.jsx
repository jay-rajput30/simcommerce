import "./WishlistContainer.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useData } from "../../providers/DataProvider";
import { useProduct } from "../../providers/ProductProvider";
import { deleteAxiosCall } from "../../services/deleteAxiosCall";
import { getAxiosCall } from "../../services/getAxiosCall";
import WishlistCard from "./WishlistCard/WishlistCard";
import ToastMessage from "../ToastMessage/ToastMessage";

const WishlistContainer = () => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();
  const { authDispatch, token } = useAuth();
  const URL = `https://simcombe.herokuapp.com/wishlist/singlewishlist`;

  const removeWishlistItemClickHandler = async (item) => {
    setMessage("item removed from wishlist");
    setShowToast(true);
    try {
      const data = await deleteAxiosCall(
        `https://simcombe.herokuapp.com/wishlist/removeitem`,
        item["_id"],
        token
      );
      const wishlistProducts = data.wishlistItem.products;

      setFetchWishlist(wishlistProducts);
    } catch (e) {
      console.error(e);
    }
  };
  // eslint-disable-next-line
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
            key={item._id}
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
