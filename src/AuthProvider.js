import { createContext, useContext, useState } from "react";

export const loginContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState({
    loginStatus: false,
    username: "test",
    password: "test",
  });

  return (
    <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
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
