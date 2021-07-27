import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

// import PrivateRoute from "./components/PrivateRoute";

import Landing from "./components/Landing/Landing";
import NavItems from "./components/NavItems/NavItems";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./AuthProvider";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
function App() {
  const [route, setRoute] = useState("product");
  const { loginStatus, username } = useAuth();
  return (
    <div className="App">
      <Navbar route={route} setRoute={setRoute} />
      {loginStatus === true ? <WelcomeUser username={username} /> : null}
      {/* <span>{loggedIn.loginStatus}</span> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Products />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <NavItems className="nav--items" />
    </div>
  );
}

export default App;
