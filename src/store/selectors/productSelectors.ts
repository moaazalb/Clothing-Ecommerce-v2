// lib/store/productSelectors.ts
import type { Product } from "@/lib/validations/product.schema";
import type { ProductRootState } from "@/types/product";

/**
 * Selects the products that match the active filters.
 *
 * @param {ProductRootState} state - The root state.
 * @returns {Product[]} The filtered products.
 */
export function selectFilteredProducts(state: ProductRootState): Product[] {
  return state.products.filteredProducts;
}

/**
 * Selects the flag that is set when a filter found nothing.
 *
 * @param {ProductRootState} state - The root state.
 * @returns {boolean} True when the last filter matched no products.
 */
export function selectProductsError(state: ProductRootState): boolean {
  return state.products.error;
}

/**
 * Selects the product list that holds the selected product.
 *
 * @param {ProductRootState} state - The root state.
 * @returns {Product[]} The selected product list (usually one product).
 */
export function selectSingleProducts(state: ProductRootState): Product[] {
  return state.products.singleProduct;
}