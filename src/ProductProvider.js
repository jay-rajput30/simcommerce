import { createContext, useContext, useReducer } from "react";
import faker from "faker";

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  quantity: 0,
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  isWishlisted: false,
  addedToCart: false,
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale",
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior",
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional",
  ]),
  color: faker.commerce.color(),
}));

const productContext = createContext();

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "OUT_OF_STOCK":
      return { ...state, showOutOfStock: !state.showOutOfStock };
    case "FAST_DELIVERY":
      return { ...state, showFastDelivery: !state.showFastDelivery };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [{ sortBy, showFastDelivery, showOutOfStock }, dispatch] = useReducer(
    reducerFunc,
    {
      sortBy: null,
      showFastDelivery: false,
      showOutOfStock: true,
    }
  );
  return (
    <productContext.Provider
      value={{
        data,
        sortBy,
        showFastDelivery,
        showOutOfStock,
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
