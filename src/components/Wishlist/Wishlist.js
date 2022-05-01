import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useData } from "../../providers/DataProvider";
import { useProduct } from "../../providers/ProductProvider";
import { deleteAxiosCall } from "../../services/deleteAxiosCall";
import { getAxiosCall } from "../../services/getAxiosCall";
import { updateAxiosCall } from "../../services/updateAxiosCall";

const Wishlist = ({ route, setRoute }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, wishlistId, cartId, authDispatch } = useAuth();

  const URL = `https://simcombe.herokuapp.com/wishlist/${userId}`;

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
              <img
                style={{ width: "100%", objectFit: "cover" }}
                src={item["imageUrl"]}
                alt={`${item["imageUrl"]}`}
              />
              <span className="card--top--text">{item["name"]}</span>
            </div>

            <div className="card--bottom">
              <div>
                <p>{item["price"]}</p>
              </div>

              <button
                onClick={async () => {
                  dataDispatch({ type: "CART_ADD", payload: item });

                  try {
                    const data = await updateAxiosCall(
                      `https://simcombe.herokuapp.com/cart/${cartId}`,
                      item["_id"]
                    );
                    const cartProducts = data.cartItem.products;
                  } catch (e) {
                    console.error(e);
                  }
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
                      `https://simcombe.herokuapp.com/wishlist/${wishlistId}`,
                      item["_id"]
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
