import Cart from "./Cart/Cart";
import "./CartContainer.css";
import { useState } from "react";
import ToastMessage from "../ToastMessage/ToastMessage";
const CartContainer = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();

  return (
    <div className="cart--container">
      <Cart
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        setMessage={setMessage}
      />
      {showToast && (
        <ToastMessage message={message} setShowToast={setShowToast} />
      )}
    </div>
  );
};

export default CartContainer;
