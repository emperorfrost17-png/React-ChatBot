
import { Product } from "./Product";

export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          //Never forget that when you loop through an array each element needs a key prop
          //React uses the key prop to identify which items in a list have changed, been added, or removed.
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
