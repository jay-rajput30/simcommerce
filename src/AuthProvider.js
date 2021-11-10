import { createContext, useContext, useReducer } from "react";

export const loginContext = createContext();

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "LOG_OFF":
      return { ...state, loginStatus: false };

    case "LOG_ON":
      return { ...state, loginStatus: true };

    // case "SET_WISHLIST":
    //   return { ...state, wishlistId: payload };
    // case "SET_CART":
    //   return { ...state, cartId: payload };
    // case "SET_USERNAME":
    //   return { ...state, username: payload };
    // case "SET_PASSWORD":
    //   return { ...state, password: payload };
    case "SET_USERID":
      return { ...state, userId: payload };

    case "SET_WISHLISTID":
      return { ...state, wishlistId: payload };

    case "SET_CARTID":
      return { ...state, cartId: payload };
    case "SET_WISHLISTITEM": {
      console.log("wishlist item is set", payload);
      return state;
    }
    case "SET_CARTITEM": {
      console.log("cart item is set");
      return state;
    }

    default:
      return state;
  }
  // return action.type === true
  //   ? { ...state, loginStatus: true }
  //   : { ...state, loginStatus: false };
};

const AuthProvider = ({ children }) => {
  const [
    { loginStatus, userId, wishlistId, cartId, wishlistItems, cartItems },
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
      }}
    >
      {children}
    </loginContext.Provider>
  );

  // useEffect(() => {
  //   const loginStatus = JSON.parse(localStorage?.getItem("login"));

  //   loginStatus?.loggedin && setLoggedIn(true);
  // }, []);

  // async function loginUserWithCredentials(username, password) {
  //   try {
  //     let response = await fakeAuthApi(username, password);

  //     if (response.success) {
  //       setLoggedIn(true);
  //       localStorage?.setItem("login", JSON.stringify({ loggedin: true }));
  //     }
  //   } catch (error) {
  //     console.log(`wrong username/password`, error);
  //   }
  // }

  // function logoutUser() {
  //   setLoggedIn(false);
  //   localStorage?.setItem("login", JSON.stringify({ loggedin: false }));
  // }
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(loginContext);
};
