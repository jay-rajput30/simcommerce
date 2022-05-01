import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useData } from "../../../providers/DataProvider";
import { useProduct } from "../../../providers/ProductProvider";
import { getAxiosCall } from "../../../services/getAxiosCall";
import { updateAxiosCall } from "../../../services/updateAxiosCall";
import ToastMessage from "../../ToastMessage/ToastMessage";
import "./Cart.css";

const Cart = ({ showToast, setShowToast, message, setMessage }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchCart, setFetchCart] = useState([]);
  const { userId, authDispatch, token } = useAuth();
  const [setToast] = useState(false);

  const URL = `https://simcombe.herokuapp.com/cart/${userId}`;

  useEffect(() => {
    async function getCart() {
      try {
        let { data } = await getAxiosCall(URL);

        const cartProducts = data.cartItem.cartProducts;

        setFetchCart([...fetchCart, ...cartProducts]);
        dataDispatch({ type: "LOAD_CART", payload: fetchCart });
        authDispatch({
          type: "SET_CARTID",
          payload: data.cartItem._id,
        });
      } catch (e) {
        console.error(e);
      }
    }
    getCart();
  }, []);

  const addCartBtnClickHandler = async (item) => {
    try {
      const data = await updateAxiosCall(
        `https://simcombe.herokuapp.com/cart`,
        item["_id"],
        token
      );

      console.log("fetchcart after item added", fetchCart);
      setFetchCart(data.cartItem.cartProducts);
    } catch (e) {
      console.error(e);
    }
    setToast && <ToastMessage message={"item added to cart"} />;
  };

  const removeCartBtnClickHandler = async (item) => {
    setMessage("item removed from cart");
    setShowToast(true);
    try {
      const data = await axios.post(
        `https://simcombe.herokuapp.com/cart/remove`,
        {
          removeProductId: item["_id"],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data.status === 200) {
        setFetchCart(data.data.cartItem.cartProducts);
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
    // try {
    //   const data = await deleteAxiosCall(
    //     `https://simcombe.herokuapp.com/cart/remove/${cartId}`,
    //     item["_id"]
    //   );
    //   console.log(data.cartItem.products.length);
    //   console.log("fetchcart after item removed", fetchCart);
    //   setFetchCart(data.cartItem.products);
    // }
    // catch (e) {
    //   console.error(e);
    // }
  };
  console.log({ fetchCart });
  let userCart = fetchCart.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );

  let newUserCart = [...new Set(userCart)];

  let totalPrice = fetchCart.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  // let totalPrice = usercartItemCount.reduce(
  //   (acc, curr) => (acc = acc + curr),
  //   0
  // );

  // console.log({ usercartItemCount, totalPrice });
  console.log({ fetchCart });
  return (
    // className="primary--section text--color__primary"
    <section className="cart--section">
      <h2 className="text-utility heading">
        Total amount: (Rs.) {totalPrice}{" "}
      </h2>
      <ul className="cart--items">
        {fetchCart.map(({ productId: item, quantity }) => {
          return (
            <li key={item._id} className="cart--item--container">
              {/* {console.log(item)} */}
              <div className="cart--item">
                <div class="cart--item__details">
                  <h4>
                    {item.name} X{quantity}
                    {/* {userCart.filter((i) => i._id === item._id).length} */}
                  </h4>
                  <div className="cart--item__button-group">
                    <button
                      onClick={
                        // dataDispatch({ type: "CART_ADD", payload: item })
                        () => addCartBtnClickHandler(item)
                      }
                      className="button primary--button"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeCartBtnClickHandler(item)}
                      className="button primary--button"
                    >
                      -
                    </button>
                    {/* <button
                      onClick={() =>
                        dataDispatch({ type: "CART_REMOVE", payload: item })
                      }
                      className="button secondary--button"
                    >
                      remove
                    </button> */}
                  </div>
                </div>
                <small className="text-utility heading">
                  (Rs.) {item.price}
                </small>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="button primary--button">proceed to checkout</button>
    </section>
  );
};

export default Cart;
