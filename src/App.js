import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const [route, setRoute] = useState("product");

  return (
    <div className="App">
      <Navbar route={route} setRoute={setRoute} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <PrivateRoute path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
