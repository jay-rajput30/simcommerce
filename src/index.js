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
    <ProductProvider>
      <DataProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </DataProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
