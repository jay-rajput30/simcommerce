import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
// import "./Wish"

const Wishlist = ({ route, setRoute }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, authDispatch } = useAuth();
  useEffect(() => {
    async function getwishlist() {
      try {
        let data = await axios.get(`http://localhost:3001/wishlist/${userId}`);
        const wishlistProducts = data.data.wishlistItem.products;
        setFetchWishlist([...wishlistProducts]);
        dataDispatch({ type: "LOAD_WISHLIST", payload: fetchWishlist });
        authDispatch({
          type: "SET_WISHLISTID",
          payload: data.data.wishlistItem._id,
        });
      } catch (e) {
        console.error(e);
      }
    }

    getwishlist();
  }, []);

  const userWishlist = fetchWishlist.map((item) =>
    productData.find((productItem) => (productItem._id = item))
  );
  return (
    <section>
      {userWishlist.map((item) => {
        return (
          <article className="card">
            <div className="card--top">
              <img src={item.imageUrl} alt={`${item.imageUrl}`} />
              <span className="card--top--text">{item.name}</span>
            </div>

            <div className="card--bottom">
              <div>
                <p>{item.price}</p>
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
                onClick={() =>
                  dataDispatch({ type: "WISHLIST_REMOVE", payload: item })
                }
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
