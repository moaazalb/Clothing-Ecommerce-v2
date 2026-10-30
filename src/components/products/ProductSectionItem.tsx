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
  };

  return (
    <Card className="relative w-96 gap-0 py-0">
      <p className="absolute right-8 top-12 z-10 mb-2 -rotate-45 text-2xl font-semibold text-red-700">
        SALE%
      </p>
      <div className="h-96 w-full overflow-hidden rounded-t-xl">
        <Image
          className="h-full w-full object-cover"
          src={product.img}
          alt={product.name}
          sizes="384px"
        />
      </div>
      <CardContent className="py-6 text-center">
        <h3 className="mb-2 text-2xl font-semibold text-slate-700">{product.name}</h3>
        <p className="font-medium text-gray-700">{product.text}</p>
        <div className="flex items-center justify-between pt-4">
          {size ? (
            <p className="font-medium text-red-600">
              Size left: <span className="text-base font-extralight text-gray-400">{size}</span>
            </p>
          ) : (
            <span />
          )}
          {color ? (
            <p className="font-medium text-gray-700">
              Color:{" "}
              <span
                role="img"
                aria-label={`Color ${color}`}
                className="ml-2 inline-block size-4 rounded-full align-middle"
                style={{ backgroundColor: color }}
              />
            </p>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-7 pb-6 pt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={!canAdd}
                  aria-label={`Add ${product.name} to cart`}
                  onClick={handleAdd}
                >
                  Add to Cart
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">Add to Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}