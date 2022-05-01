import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NavItems from "./components/NavItems/NavItems";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./providers/AuthProvider";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
function App() {
  const [route, setRoute] = useState("product");
  const { loginStatus, username } = useAuth();
  return (
    <div className="App">
      {loginStatus === true ? <WelcomeUser username={username} /> : null}

      <Routes>
        <Route path="/" element={<Home route={route} setRoute={setRoute} />} />
        <PrivateRoute path="/product" element={<ProductView />} />
        <PrivateRoute path="/wishlist" element={<WishlistPage />} />
        <PrivateRoute path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <NavItems className="nav--items" />
    </div>
  );
}

export default App;
