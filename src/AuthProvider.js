import { createContext, useContext, useState, useEffect } from "react";
import fakeAuthApi from "./fakeAuthApi";

export const loginContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.loggedin && setLoggedIn(true);
  }, []);

  async function loginUserWithCredentials(username, password) {
    try {
      let response = await fakeAuthApi(username, password);

      if (response.success) {
        setLoggedIn(true);
        localStorage?.setItem("login", JSON.stringify({ loggedin: true }));
      }
    } catch (error) {
      console.log(`wrong username/password`, error);
    }
  }

  function logoutUser() {
    setLoggedIn(false);
    localStorage?.setItem("login", JSON.stringify({ loggedin: false }));
  }

  return (
    <loginContext.Provider
      value={{ loggedin, loginUserWithCredentials, logoutUser }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(loginContext);
};
