import { createContext, useReducer, useContext } from "react";

export const dataContext = createContext();

const dataReducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "WISHLIST_ADD": {
      let newPayload = { ...payload, quantity: 1, isWishlisted: true };
      const wishlistItemAlreadyPresent = state.wishlistItems.some(
        (item) => item.id === payload.id
      );
      return wishlistItemAlreadyPresent
        ? {
            ...state,
            wishlistItems: state.wishlistItems.map((item) =>
              item.id === payload.id
                ? { ...item, quantity: item.quantity + 1, isWishlisted: true }
                : item
            ),
          }
        : { ...state, wishlistItems: [...state.wishlistItems, newPayload] };
    }

    case "WISHLIST_REMOVE":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id != payload.id
        ),
      };

    case "CART_ADD": {
      let newPayload = { ...payload, quantity: 1 };
      const cartItemAlreadyPresent = state.cartItems.some(
        (item) => item.id === payload.id
      );
      return cartItemAlreadyPresent
        ? {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cartItems: [...state.cartItems, newPayload] };
    }

    case "CART_DECREASE":
      return payload.quantity > 0
        ? {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === payload.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : state;

    case "CART_REMOVE":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id),
      };

    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [
    { wishlistItems, cartItems },
    dataDispatch,
  ] = useReducer(dataReducerFunc, { wishlistItems: [], cartItems: [] });
  return (
    <dataContext.Provider value={{ wishlistItems, cartItems, dataDispatch }}>
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => {
  return useContext(dataContext);
};
