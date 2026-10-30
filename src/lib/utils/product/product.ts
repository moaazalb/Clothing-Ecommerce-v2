// lib/utils/product.ts
import type { Product } from "@/lib/validations/product.schema";

export interface DefaultSelection {
  size?: string;
  color?: string;
}


/**
 * Finds a product by id.
 *
 * @param {readonly Product[]} products - The products to search.
 * @param {string} id - The product id.
 * @returns {Product | undefined} The product, or undefined when there is no match.
 */
export function findProductById(products: readonly Product[], id: string): Product | undefined {
  return products.find((product) => product.id === id);
}



/**
 * Returns the first size and the first color of a product, the defaults for a quick "Add to Cart".
 *
 * @param {Pick<Product, "size" | "color">} product - The product.
 * @returns {DefaultSelection} The first size (undefined for products without sizes) and the first color (undefined when there are none).
 */
export function getDefaultSelection(product: Pick<Product, "size" | "color">): DefaultSelection {
  return { size: product.size?.[0], color: product.color[0] };
}