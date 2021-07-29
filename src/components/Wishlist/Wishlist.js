import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useData } from "../../DataProvider";
import { useAxios } from "../../hooks/useAxios";
import { useProduct } from "../../ProductProvider";
// import "./Wish"

const Wishlist = ({ route, setRoute }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchWishlist, setFetchWishlist] = useState([]);
  const { userId, wishlistId, authDispatch } = useAuth();

  const URL = `http://localhost:3001/wishlist/${userId}`;
  const { data, status, error } = useAxios(URL);
  useEffect(() => {
    if (status === "pending") {
      console.log("data is loading");
    }
    // async function getwishlist() {
    //   try {
    //     // let data = await axios.get(`http://localhost:3001/wishlist/${userId}`);
    //     const wishlistProducts = data.data.wishlistItem.products;
    //     console.log(data.status);
    //     setFetchWishlist([...fetchWishlist, ...wishlistProducts]);
    //     dataDispatch({ type: "LOAD_WISHLIST", payload: fetchWishlist });
    //     authDispatch({
    //       type: "SET_WISHLISTID",
    //       payload: data.data.wishlistItem._id,
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
    // getwishlist();
  }, []);

  const userWishlist = fetchWishlist.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );
  console.log({ userWishlist });
  return (
    <section>
      {console.log({ fetchWishlist })}
      {userWishlist.map((item) => {
        return (
          <article className="card">
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
                    const data = await axios.delete(
                      `http://localhost:3001/wishlist/${wishlistId}`,
                      { productId: item["_id"] }
                    );
                    const wishlistProducts = data.data.wishlistItem.products;
                    console.log({ wishlistProducts });
                    // setFetchWishlist([...fetchWishlist, ...wishlistProducts]);
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
