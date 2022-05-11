import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { useData } from "../../../providers/DataProvider";
import { useProduct } from "../../../providers/ProductProvider";
import { getAxiosCall } from "../../../services/getAxiosCall";
import { updateAxiosCall } from "../../../services/updateAxiosCall";
import "./Cart.css";
const Cart = ({ showToast, setShowToast, message, setMessage }) => {
  const { productData } = useProduct();
  const { dataDispatch } = useData();
  const [fetchCart, setFetchCart] = useState([]);
  const { userId, authDispatch, token } = useAuth();

  const URL = `https://simcombe.herokuapp.com/cart/${userId}`;
  // eslint-disable-next-line
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

      setFetchCart(data.cartItem.cartProducts);
    } catch (e) {
      console.error(e);
    }
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
  };

  let userCart = fetchCart.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );

  let totalPrice = fetchCart.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  return (
    <section className="cart--section">
      <h2 className="text-utility heading">
        Total amount: (Rs.) {totalPrice}{" "}
      </h2>
      <ul className="cart--items">
        {fetchCart.map(({ productId: item, quantity }) => {
          return (
            <li key={item._id} className="cart--item--container">
              <div className="cart--item">
                <div className="cart--item__details">
                  <h4>
                    {item.name} X{quantity}
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
