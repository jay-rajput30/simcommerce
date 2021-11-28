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

const WishlistContainer = ({ route, setRoute }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, wishlistId, cartId, authDispatch } = useAuth();
  const URL = `http://localhost:3001/wishlist/${userId}`;

  const removeWishlistItemClickHandler = async (item) => {
    // dataDispatch({ type: "WISHLIST_REMOVE", payload: item });
    console.log({ name: item["name"] });
    try {
      const data = await deleteAxiosCall(
        `http://localhost:3001/wishlist/${wishlistId}`,
        item["_id"]
      );
      const wishlistProducts = data.wishlistItem.products;
      console.log({ wishlistProducts });
      setFetchWishlist(wishlistProducts);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function getwishlist() {
      try {
        let { data } = await getAxiosCall(URL);

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
          />
        );
      })}
    </section>
  );
};

export default WishlistContainer;
