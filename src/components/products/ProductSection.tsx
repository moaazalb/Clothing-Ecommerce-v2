// components/products/ProductSection.tsx
import type { ReactElement } from "react";
import { ProductSectionItem } from "@/components/products/ProductSectionItem";
import { storeData } from "@/lib/data/dummyData";

const FEATURED_PRODUCTS_COUNT = 6;
const SECTION_TITLE = "SUMMER T-Shirt SALE 30%";

/**
 * Home page sale section: a banner and the first products of the catalog.
 * It has no state or events, so it stays a Server Component.
 *
 * @returns {JSX.Element} The sale section.
 */
export function ProductSection(): ReactElement {
  const featuredProducts = storeData.slice(0, FEATURED_PRODUCTS_COUNT);

  return (
    <section aria-labelledby="sale-title">
      <div className="mx-auto w-[50%] rounded-md bg-black p-2">
        <h2
          id="sale-title"
          className="text-center font-inter text-lg font-bold leading-none tracking-normal text-red-600"
        >
          {SECTION_TITLE}
        </h2>
      </div>
      {featuredProducts.length === 0 ? (
        <p role="status" className="py-8 text-center font-inter text-base">
          No products available
        </p>
      ) : (
        <ul className="mx-auto grid max-w-7xl grid-cols-3 justify-items-center gap-4 py-8">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <ProductSectionItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}