import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthProvider";
import { useData } from "../../../DataProvider";
import { useProduct } from "../../../ProductProvider";
import { deleteAxiosCall } from "../../../services/deleteAxiosCall";
import { getAxiosCall } from "../../../services/getAxiosCall";
import { updateAxiosCall } from "../../../services/updateAxiosCall";
import "./Cart.css";
const Cart = () => {
  const { productData } = useProduct();
  const { cartItems, dataDispatch } = useData();
  const [fetchCart, setFetchCart] = useState([]);
  const { userId, cartId, authDispatch } = useAuth();

  const URL = `http://localhost:3001/cart/${userId}`;

  useEffect(() => {
    async function getCart() {
      try {
        let { data } = await getAxiosCall(URL);
        // console.log(data);
        const cartProducts = data.cartItem.products;
        // console.log(cartProducts);
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
    // console.log({ itemId: item._id });
    try {
      const data = await updateAxiosCall(
        `http://localhost:3001/cart/${cartId}`,
        item["_id"]
      );
      console.log(data.cartItem.products.length);
      console.log("fetchcart after item added", fetchCart);
      setFetchCart(data.cartItem.products);
    } catch (e) {
      console.error(e);
    }
  };

  const removeCartBtnClickHandler = async (item) => {
    try {
      const data = await deleteAxiosCall(
        `http://localhost:3001/cart/${cartId}`,
        item["_id"]
      );
      console.log(data.cartItem.products.length);
      console.log("fetchcart after item removed", fetchCart);
      setFetchCart(data.cartItem.products);
    } catch (e) {
      console.error(e);
    }
  };
  let userCart = fetchCart.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );

  let newUserCart = [...new Set(userCart)];

  let usercartItemCount = userCart.map(
    (item) => userCart.filter((i) => i._id === item._id).length * item.price
  );

  let totalPrice = usercartItemCount.reduce(
    (acc, curr) => (acc = acc + curr),
    0
  );

  // console.log({ usercartItemCount, totalPrice });
  console.log({ fetchCart });
  return (
    // className="primary--section text--color__primary"
    <section>
      <h2 className="text-utility heading">
        Total amount: (Rs.) {totalPrice}{" "}
      </h2>
      <ul className="cart--items">
        {newUserCart.map((item) => {
          return (
            <li key={item._id} className="cart--item--container">
              {/* {console.log(item)} */}
              <div className="cart--item">
                <div class="cart--item__details">
                  <h4>
                    {item.name} X{" "}
                    {userCart.filter((i) => i._id === item._id).length}
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
