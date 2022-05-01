import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  return <h3>this is product {id}</h3>;
};

return ProductDetails;
