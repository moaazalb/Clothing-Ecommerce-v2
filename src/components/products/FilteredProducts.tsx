// components/products/FilteredProducts.tsx
"use client";

import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { FilterBar } from "@/components/products/FilterBar";
import { ProductCard } from "@/components/products/ProductCard";
import { selectFilteredProducts, selectProductsError } from "@/src/store/selectors/productSelectors";
import type { ProductType } from "@/lib/validations/product.schema";

interface FilteredProductsProps {
  type: ProductType;
}

/**
 * Products of one type with the filter bar. Shows an error when a filter finds nothing,
 * and an empty message when the type has no products.
 *
 * @param {FilteredProductsProps} props - Component props.
 * @param {ProductType} props.type - The product type shown on the page.
 * @returns {JSX.Element} The page content.
 */
export function FilteredProducts({ type }: FilteredProductsProps): ReactElement {
  const products = useSelector(selectFilteredProducts);
  const hasError = useSelector(selectProductsError);
  const visibleProducts = products.filter((product) => product.type === type);

  return (
    <section className="pt-16">
      <div className="pl-14">
        <h1 className="font-inter text-4xl font-bold leading-none tracking-normal text-gray-600">
          {type}
        </h1>
        <FilterBar type={type} />
      </div>
      {hasError ? (
        <ErrorMessage />
      ) : visibleProducts.length === 0 ? (
        <p role="status" className="py-8 text-center font-inter text-base">
          No products found
        </p>
      ) : (
        <ul className="grid grid-cols-4 justify-items-center gap-12 py-8">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                text={product.text}
                img={product.img}
                price={product.price}
                colors={product.color}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}