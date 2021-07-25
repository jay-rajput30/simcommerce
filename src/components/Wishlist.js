import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { useData } from "../DataProvider";
// import { useWishlist } from "../WishlistProvider";

const Wishlist = ({ route, setRoute }) => {
  const { wishlistItems, cartItems, dataDispatch } = useData();
  const { userId } = useAuth();
  useEffect(() => {
    async function getwishlist() {
      try {
        let data = await axios.get(`http://localhost:3001/wishlist/${userId}`);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }

    getwishlist();
  }, []);
  return (
    <section>
      {wishlistItems.map((item) => {
        return (
          <article className="card">
            <div className="card--top">
              <img src={item.image} alt={`${item.image}`} />
              <span className="card--top--text">{item.name}</span>
            </div>

            <div className="card--bottom">
              <div>
                <p>{item.price}</p>
              </div>

              <button
                onClick={() => {
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
      {/* <h1>Total items in wishList are {wishlistItems.length}</h1> */}
    </section>
  );
};

export default Wishlist;
