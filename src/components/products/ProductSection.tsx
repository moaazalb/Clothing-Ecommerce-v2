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
    <section
      aria-labelledby="sale-title"
      className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-[#D6B58A] bg-[#4B3621] p-3 shadow-sm sm:p-4">
        <h2
          id="sale-title"
          className="
            text-center
            font-inter
            text-base
            font-bold
            leading-relaxed
            tracking-normal
            text-[#F8F4ED]
            sm:text-lg
            md:text-xl
          "
        >
          {SECTION_TITLE}
        </h2>
      </div>

      {featuredProducts.length === 0 ? (
        <p
          role="status"
          className="py-12 text-center font-inter text-base text-[#806B56] sm:text-lg"
        >
          No products available
        </p>
      ) : (
        <ul
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            justify-items-center
            gap-6
            py-8
            sm:grid-cols-2
            sm:gap-6
            lg:grid-cols-3
            lg:gap-8
            xl:gap-10
          "
        >
          {featuredProducts.map((product) => (
            <li key={product.id} className="w-full min-w-0 max-w-sm">
              <ProductSectionItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
