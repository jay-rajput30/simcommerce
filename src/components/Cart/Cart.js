import { useData } from "../../DataProvider";

const Cart = () => {
  const { cartItems, dataDispatch } = useData();
  const totalPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.price;
  }, 0);
  return (
    <section className="primary--section text--color__primary">
      <h2 className="text-utility heading">
        Total amount: (Rs.) {totalPrice}{" "}
      </h2>
      <ul className="cart--items">
        {cartItems.map((item) => {
          if (item.quantity > 0) {
            return (
              <li className="cart--item--container">
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
                    (Rs.) {item.price * item.quantity}
                  </small>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <button className="button primary--button">proceed to checkout</button>
    </section>
  );
};

export default Cart;
