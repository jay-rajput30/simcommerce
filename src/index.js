import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./ProductProvider";
// import { CartProvider } from "./CartProvider";
// import { WishlistProvider } from "./WishlistProvider";
import AuthProvider from "./AuthProvider";
import { DataProvider } from "./DataProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <DataProvider>
          <Router>
            <App />
          </Router>
        </DataProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
