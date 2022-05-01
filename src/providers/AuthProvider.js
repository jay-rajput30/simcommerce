import { createContext, useContext, useReducer } from "react";

export const loginContext = createContext();

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "LOG_OFF":
      return { ...state, loginStatus: false };

    case "LOG_ON":
      return { ...state, loginStatus: true };

    case "SET_USERID":
      return { ...state, userId: payload };

    case "SET_USER_COLLECTION":
      return {
        ...state,
        cartId: payload.cartId,
        wishlistId: payload.wishlistId,
      };
    case "SET_WISHLISTITEM": {
      return state;
    }
    case "SET_CARTITEM": {
      return state;
    }
    case "USER_LOGGEDIN":
      return {
        loginStatus: true,
        userId: payload.userId,
        wishlistId: payload.wishlistItem._id,
        cartId: payload.cartItem._id,
        wishlistItems: payload.wishlistItem.products,
        cartItems: payload.cartItem.cartProducts,
        token: payload.token,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [
    {
      loginStatus,
      userId,
      wishlistId,
      cartId,
      wishlistItems,
      cartItems,
      token,
    },
    authDispatch,
  ] = useReducer(reducerFunc, {
    loginStatus: false,
    userId: null,
  });

  return (
    <loginContext.Provider
      value={{
        loginStatus,
        userId,
        wishlistId,
        cartId,
        authDispatch,
        wishlistItems,
        cartItems,
        token,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(loginContext);
};
