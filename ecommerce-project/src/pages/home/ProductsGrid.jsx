
import { Product } from "./Product";

export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {/* Search flow step 14:
        ProductsGrid receives the products from HomePage.
        If the user searched, this array contains only matching products.
        If the user did not search, this array contains all products. */}
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
