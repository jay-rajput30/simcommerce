import { useProduct } from "../../../ProductProvider";
import "./DesktopFilter.css";

const DesktopFilter = () => {
  const { sortBy, dispatch } = useProduct();
  return (
    <section className="filter--options">
      <fieldset>
        <legend>filter options</legend>

        <div className="price--sort">
          <div className="filter--options__item">
            <input
              onChange={() =>
                dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
              }
              type="radio"
              name="price--sort"
              id="high--to--low"
              checked={sortBy && sortBy === "HIGH_TO_LOW"}
            />
            <label htmlFor="high--to--low">high to low</label>
          </div>
          <div className="filter--options__item">
            <input
              onChange={() =>
                dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
              }
              type="radio"
              name="price--sort"
              id="low--to--high"
              checked={sortBy && sortBy === "LOW_TO_HIGH"}
            />
            <label htmlFor="low--to--high">low to high</label>
          </div>
        </div>
        <div className="delivery--sort">
          {/* <div className="filter--options__item">
        <input
          onChange={() => dispatch({ type: "OUT_OF_STOCK" })}
          type="checkbox"
          id="out_of_stock"
          name="out_of_stock"
          value="out of stock"
        />
        <label htmlFor="out_of_stock">remove out of stock</label>
      </div> */}
          <div className="filter--options__item">
            <input
              onChange={() => dispatch({ type: "FAST_DELIVERY" })}
              type="checkbox"
              id="fast_delivery"
              name="fast_delivery"
              value="fast_delivery"
            />
            <label htmlFor="fast_delivery">fast delivery</label>
          </div>
        </div>
      </fieldset>
    </section>
  );
};

export default DesktopFilter;
