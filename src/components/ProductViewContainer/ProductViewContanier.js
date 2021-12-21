import DesktopFilter from "./DesktopFilter/DesktopFilter";
import Products from "./Products/Products";
import "./ProductViewContainer.css";
import { useState, useEffect } from "react";
import MobileFilter from "./MobileFilter/MobileFilter";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import ToastMessage from "../ToastMessage/ToastMessage";

const ProductViewContainer = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();
  const {
    loginStatus,
    userId,
    wishlistId,
    cartId,
    wishlistItems,
    cartItems,
    authDispatch,
  } = useAuth();

  useEffect(() => {
    async function fetchUserDetails() {
      const data = await axios.get(
        `http://localhost:3001/user/usercollection/${userId}`
      );

      authDispatch({
        type: "SET_WISHLISTID",
        payload: { cartId: data.data.cartId, wishlistId: data.data.wishlistId },
      });
    }

    fetchUserDetails();
  }, []);

  console.log({ userId, wishlistId, cartId });

  const showFilterBtnHandler = () => {
    setShowFilter(true);
  };
  const hideFilter = () => {
    setShowFilter(false);
  };
  return (
    <div className="product--view--container">
      <DesktopFilter />
      <Products
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
        setMessage={setMessage}
      />
      <button className="floating--button" onClick={showFilterBtnHandler}>
        +
      </button>
      {showFilter && <MobileFilter hideFilter={hideFilter} />}
      {showToast && (
        <ToastMessage message={message} setShowToast={setShowToast} />
      )}
    </div>
  );
};

export default ProductViewContainer;
