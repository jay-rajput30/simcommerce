import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

// import PrivateRoute from "./components/PrivateRoute";

import Landing from "./components/Landing/Landing";
import NavItems from "./components/NavItems/NavItems";
function App() {
  const [route, setRoute] = useState("product");

  return (
    <div className="App">
      <Navbar route={route} setRoute={setRoute} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <NavItems className="nav--items" />
    </div>
  );
}

export default App;
