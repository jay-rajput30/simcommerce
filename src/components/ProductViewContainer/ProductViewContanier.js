import DesktopFilter from "./DesktopFilter/DesktopFilter";
import Products from "./Products/Products";
import "./ProductViewContainer.css";
import { useState, useEffect } from "react";
import MobileFilter from "./MobileFilter/MobileFilter";
import { useAuth } from "../../AuthProvider";
import axios from "axios";

const ProductViewContainer = () => {
  const [showFilter, setShowFilter] = useState(false);
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
    async function fetchWishlist() {
      const { data } = await axios.get(
        `http://localhost:3001/wishlist/${userId}`
      );

      authDispatch({
        type: "SET_WISHLISTID",
        payload: data.wishlistItem._id,
      });
      authDispatch({
        type: "SET_WISHLISTITEM",
        payload: data.wishlistItem.products,
      });
    }

    fetchWishlist();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      const { data } = await axios.get(`http://localhost:3001/cart/${userId}`);
      authDispatch({
        type: "SET_CARTID",
        payload: data.cartItem._id,
      });
      authDispatch({
        type: "SET_CARTITEM",
        payload: data.cartItem.products,
      });
    }

    fetchCart();
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
      <Products />
      <button className="floating--button" onClick={showFilterBtnHandler}>
        +
      </button>
      {showFilter && <MobileFilter hideFilter={hideFilter} />}
    </div>
  );
};

export default ProductViewContainer;