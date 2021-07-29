import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
import { deleteAxiosCall } from "../../services/deleteAxiosCall";
import { getAxiosCall } from "../../services/getAxiosCall";

const Wishlist = ({ route, setRoute }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, wishlistId, authDispatch } = useAuth();

  const URL = `http://localhost:3001/wishlist/${userId}`;

  useEffect(() => {
    async function getwishlist() {
      try {
        let data = await getAxiosCall(URL);

        const wishlistProducts = data.wishlistItem.products;

        setFetchWishlist([...fetchWishlist, ...wishlistProducts]);
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
    <section>
      {userWishlist.map((item) => {
        return (
          <article key={item._id} className="card">
            <div className="card--top">
              <img src={item["imageUrl"]} alt={`${item["imageUrl"]}`} />
              <span className="card--top--text">{item["name"]}</span>
            </div>

            <div className="card--bottom">
              <div>
                <p>{item["price"]}</p>
              </div>

              <button
                onClick={async () => {
                  dataDispatch({ type: "CART_ADD", payload: item });
                }}
                className="button primary--button"
              >
                add to cart
              </button>
              <button
                onClick={async () => {
                  dataDispatch({ type: "WISHLIST_REMOVE", payload: item });
                  try {
                    const data = await deleteAxiosCall(
                      `http://localhost:3001/wishlist/${wishlistId}`,
                      { productId: item["_id"] }
                    );
                    const wishlistProducts = data.wishlistItem.products;
                    setFetchWishlist([...wishlistProducts]);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="button secondary--button"
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Wishlist;
