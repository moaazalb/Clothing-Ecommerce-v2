// components/products/SingleProduct.tsx
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { AddToCartForm } from "@/components/products/singleProduct/AddToCartForm";
import { selectSingleProducts } from "@/store/selectors/productSelectors";
import { findProductById } from "@/lib/utils/product/product";
import type { ProductId } from "@/lib/validations/product.schema";

const DISCOUNT_LABEL = "15% OFF";

interface SingleProductProps {
  id: ProductId;
}

/**
 * Detail view of the selected product: image, name, discount label, description and the
 * add-to-cart form. Shows a message when the selected product is not the one in the URL.
 *
 * @param {SingleProductProps} props - Component props.
 * @param {string} props.id - The product id from the route.
 * @returns {JSX.Element} The product details.
 */
export function SingleProduct({ id }: SingleProductProps): ReactElement {
  const products = useSelector(selectSingleProducts);
  const product = findProductById(products, id);

  if (!product) {
    return (
      <p
        role="status"
        className="px-4 py-16 text-center font-inter text-base text-[#806B56] sm:py-20"
      >
        Product not found
      </p>
    );
  }

  return (
    <article className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
      {/* Product Image */}
      <div className="flex w-full items-center justify-center rounded-2xl border border-[#E8D8C3] bg-[#F8F4ED] p-4 sm:p-6 lg:p-8">
        <Image
          className="h-auto max-h-[420px] w-full max-w-[520px] rounded-xl object-contain sm:max-h-[560px] lg:max-h-[720px]"
          src={product.img}
          alt={product.name}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
        />
      </div>

      {/* Product Details */}
      <div className="flex w-full min-w-0 items-center justify-center">
        <div className="w-full max-w-xl">
          <h1 className="mb-4 font-inter text-2xl font-bold leading-tight tracking-normal text-[#4B3621] sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <p className="mb-5 inline-flex rounded-md bg-[#F8F4ED] px-3 py-2 font-inter text-base font-bold text-[#A87945] sm:text-lg">
            {DISCOUNT_LABEL}
          </p>

          <p className="mb-8 font-inter text-base leading-7 text-[#806B56] sm:text-lg sm:leading-8">
            {product.text}
          </p>

          <AddToCartForm key={product.id} product={product} />
        </div>
      </div>
    </article>
  );
}