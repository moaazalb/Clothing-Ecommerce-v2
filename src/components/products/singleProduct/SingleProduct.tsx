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
      <p role="status" className="py-10 text-center font-inter text-base">
        Product not found
      </p>
    );
  }

  return (
    <article className="flex items-center justify-center py-10">
      <div className="grow-[2] pl-44">
        <Image
          className="h-[850px] w-auto rounded-lg"
          src={product.img}
          alt={product.name}
          priority
        />
      </div>
      <div className="grow-[3]">
        <div className="max-w-lg">
          <h1 className="pb-4 font-inter text-2xl font-bold leading-none tracking-normal">
            {product.name}
          </h1>
          <p className="pb-4 font-inter text-xl font-bold leading-none tracking-normal text-orange-700">
            {DISCOUNT_LABEL}
          </p>
          <p className="pb-4 font-inter text-xl font-bold leading-none tracking-normal text-gray-600">
            {product.text}
          </p>
          <AddToCartForm key={product.id} product={product} />
        </div>
      </div>
    </article>
  );
}