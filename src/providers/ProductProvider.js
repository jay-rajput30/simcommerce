import { createContext, useContext, useReducer } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const productContext = createContext();

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "FAST_DELIVERY":
      return { ...state, showFastDelivery: !state.showFastDelivery };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://simcombe.herokuapp.com/product"
      );
      setProductData([...data.products]);
    }
    fetchData();
  }, []);

  const [{ sortBy, showFastDelivery }, dispatch] = useReducer(reducerFunc, {
    sortBy: null,
    showFastDelivery: false,
  });

  return (
    <productContext.Provider
      value={{
        productData,
        sortBy,
        showFastDelivery,
        dispatch,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(productContext);
};
