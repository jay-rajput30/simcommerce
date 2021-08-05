import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useData } from "../../DataProvider";
import { useProduct } from "../../ProductProvider";
import { getAxiosCall } from "../../services/getAxiosCall";

const Cart = () => {
  const { productData } = useProduct();
  const { cartItems, dataDispatch } = useData();
  const [fetchCart, setFetchCart] = useState([]);
  const { userId, cartId, authDispatch } = useAuth();

  const URL = `http://localhost:3001/cart/${userId}`;

  useEffect(() => {
    async function getCart() {
      try {
        let data = await getAxiosCall(URL);
        console.log(data);
        const cartProducts = data.cartItem.products;
        console.log(cartProducts);
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

  const userCart = fetchCart.map((item) =>
    productData.find((productItem) => productItem._id === item)
  );

  const totalPrice = userCart.reduce((acc, cur) => {
    return {...acc, cur.name= cur.name};
  }, {});
  let quantity = 0;
  const userCartQuantities = userCart.reduce((acc, curr) => {
    return acc.includes(curr._id)
      ? acc
      : [...acc, curr, (quantity = quantity + 1)];
  }, {});

  console.log({ totalPrice });
  return (
    <section className="primary--section text--color__primary">
      <h2 className="text-utility heading">
        Total amount: (Rs.) {totalPrice}{" "}
      </h2>
      <ul className="cart--items">
        {userCart.map((item) => {
          return (
            <li className="cart--item--container">
              {console.log(item)}
              <div className="cart--item">
                <div class="cart--item__details">
                  <h4>
                    {item.name} X {item.quantity}
                  </h4>
                  <div className="cart--item__button-group">
                    <button
                      onClick={() =>
                        dataDispatch({ type: "CART_ADD", payload: item })
                      }
                      className="button primary--button"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dataDispatch({ type: "CART_DECREASE", payload: item })
                      }
                      className="button primary--button"
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        dataDispatch({ type: "CART_REMOVE", payload: item })
                      }
                      className="button secondary--button"
                    >
                      remove
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
