import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
// import PrivateRoute from "./components/PrivateRoute";

import Landing from "./components/Landing/Landing";
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
      </Routes>
    </div>
  );
}

export default App;
