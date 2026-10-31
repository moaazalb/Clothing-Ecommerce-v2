// components/products/FilteredProducts.tsx
"use client";

import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { FilterBar } from "@/components/products/FilterBar";
import { ProductCard } from "@/components/products/ProductCard";
import { selectFilteredProducts, selectProductsError } from "@/store/selectors/productSelectors";
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
   <section className="w-full pt-8 sm:pt-12 lg:pt-16">
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14">
    <h1
      className="
        mb-5
        font-inter
        text-2xl
        font-bold
        leading-tight
        tracking-normal
        text-[#4B3621]
        sm:text-3xl
        lg:text-4xl
      "
    >
      {type}
    </h1>

    <FilterBar type={type} />
  </div>

  {hasError ? (
    <ErrorMessage />
  ) : visibleProducts.length === 0 ? (
    <p
      role="status"
      className="
        py-12
        text-center
        font-inter
        text-base
        text-[#806B56]
        sm:text-lg
      "
    >
      No products found
    </p>
  ) : (
    <ul
  className="
    grid
    grid-cols-1
    justify-items-center
    gap-6
    px-4
    py-8
    sm:grid-cols-2
    sm:gap-6
    lg:grid-cols-4
    lg:gap-6
    xl:gap-10
  "
>
  {visibleProducts.map((product) => (
    <li key={product.id} className="w-full min-w-0 max-w-sm">
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