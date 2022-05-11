import "./index.css";
import App from "./App";
import { ProductProvider } from "./providers/ProductProvider";
import AuthProvider from "./providers/AuthProvider";
import { DataProvider } from "./providers/DataProvider";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

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
