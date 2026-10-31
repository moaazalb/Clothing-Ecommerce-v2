// components/products/ProductSectionItem.tsx
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { addToCart } from "@/store/slices/cartSlice/CartSlice";
import { getDefaultSelection } from "@/lib/utils//product/product";
import type { Product } from "@/lib/validations/product.schema";
import { showSuccess } from "@/lib/utils/alerts/alerts";

interface ProductSectionItemProps {
  product: Product;
}

/**
 * Sale card with a quick "Add to Cart" button. It adds one unit with the product's
 * first size and first color. The button is disabled when the product has no color.
 *
 * @param {ProductSectionItemProps} props - Component props.
 * @param {Product} props.product - The product to show.
 * @returns {JSX.Element} The card.
 */
export function ProductSectionItem({ product }: ProductSectionItemProps): ReactElement {
  const dispatch = useDispatch();
  const { size, color } = getDefaultSelection(product);
  const canAdd = color !== undefined;

  /**
   * Adds one unit of the product, with its default size and color, to the cart.
   *
   * @returns {void}
   */
  const handleAdd = (): void => {
  if (color === undefined) return;

  dispatch(
    addToCart({
      id: product.id,
      name: product.name,
      img: product.img,
      text: product.text,
      price: product.price,
      color,
      ...(size ? { size } : {}),
    })
  );

  showSuccess(
    "Added to Cart!",
    `${product.name} has been added to your cart.`
  );
};

  return (
    <Card className="relative w-full max-w-sm gap-0 overflow-hidden rounded-xl border border-[#E8D8C3] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4B3621]/10">
      <div className="absolute right-3 top-5 z-10 -rotate-45 rounded-sm bg-[#A87945] px-4 py-1 text-sm font-bold text-white shadow-md sm:right-5 sm:top-6 sm:text-base">
        SALE%
      </div>

      <div className="relative aspect-square w-full overflow-hidden bg-[#F8F4ED]">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <CardContent className="px-4 py-4 text-center sm:py-6">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-[#4B3621] sm:text-xl">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm font-medium leading-relaxed text-[#806B56] sm:text-base">
          {product.text}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          {size ? (
            <p className="text-sm font-semibold text-[#4B3621]">
              Size left:{" "}
              <span className="font-normal text-[#806B56]">{size}</span>
            </p>
          ) : (
            <span />
          )}

          {color ? (
            <p className="flex items-center text-sm font-medium text-[#4B3621]">
              Color:
              <span
                role="img"
                aria-label={`Color ${color}`}
                className="ml-2 inline-block size-4 rounded-full border border-[#D6B58A]"
                style={{ backgroundColor: color }}
              />
            </p>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-[#E8D8C3] bg-[#F8F4ED]/50 px-4 pb-5 pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="
                    h-10 w-full
                    border-[#D6B58A]
                    bg-[#F8F4ED]
                    px-5
                    text-sm
                    font-semibold
                    text-[#4B3621]
                    transition-all duration-300
                    hover:border-[#A87945]
                    hover:bg-[#A87945]
                    hover:text-white
                    focus-visible:ring-2
                    focus-visible:ring-[#A87945]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:h-11 sm:w-auto sm:text-base
                  "
                  disabled={!canAdd}
                  aria-label={`Add ${product.name} to cart`}
                  onClick={handleAdd}
                >
                  Add to Cart
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="border-[#4B3621] bg-[#4B3621] text-[#F8F4ED]"
            >
              Add to Cart
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}