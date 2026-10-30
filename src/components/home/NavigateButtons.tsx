// components/home/NavigateButtons.tsx
"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { NAVIGATION_PRODUCT_TYPES } from "@/lib/constants/productFilters";
import { filterProducts } from "@/store/slices/productSlice/ProductSlice";
import type { ProductType } from "@/lib/validations/product.schema";

/**
 * Row of category links. Clicking one sets the product filter in the store and opens
 * that category's page.
 *
 * @returns {JSX.Element} The category navigation.
 */
export function NavigateButtons(): ReactElement {
  const dispatch = useDispatch();

  /**
   * Resets the product list to the chosen category before the page opens.
   *
   * @param {ProductType} type - The category that was clicked.
   * @returns {void}
   */
  const handleSelect = (type: ProductType): void => {
    dispatch(filterProducts(type));
  };

  return (
    <nav aria-label="Product categories" className="py-8">
      <ul className="flex items-center justify-center">
        {NAVIGATION_PRODUCT_TYPES.map((type) => (
          <li key={type} className="mr-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-black duration-300 ease-in-out hover:bg-gray-300"
            >
              <Link href={`/products/${encodeURIComponent(type)}`} onClick={() => handleSelect(type)}>
                {type}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}