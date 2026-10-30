// components/products/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { ColorSwatches } from "@/components/products/ColorSwatches";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { singleProduct } from "@/store/slices/productSlice/ProductSlice";
import { productRouteParamsSchema } from "@/lib/validations/product.schema";
import type { Product, ProductId } from "@/lib/validations/product.schema";

interface ProductCardProps {
  id: ProductId;
  name: string;
  text: string;
  img: Product["img"];
  price: number;
  colors?: readonly string[];
}

/**
 * Product card with image, name, description, price and colors. Clicking it selects the
 * product in the store and opens its detail page. If the route has no valid product type,
 * the card is shown without a link.
 *
 * @param {ProductCardProps} props - Component props.
 * @param {string} props.id - Product id.
 * @param {string} props.name - Product name, also used as the image alt text.
 * @param {string} props.text - Product description.
 * @param {Product["img"]} props.img - The static image object.
 * @param {number} props.price - Price in dollars.
 * @param {readonly string[]} [props.colors] - Available colors.
 * @returns {JSX.Element} The card.
 */
export function ProductCard({
  id,
  name,
  text,
  img,
  price,
  colors,
}: ProductCardProps): ReactElement {
  const dispatch = useDispatch();
  const params = productRouteParamsSchema.safeParse(useParams());

  /**
   * Stores the selected product so the detail page can show it.
   *
   * @returns {void}
   */
  const handleSelect = (): void => {
    dispatch(singleProduct(id));
  };

  const card = (
    <Card className="w-96 gap-0 py-0">
      <div className="relative mx-4 -mt-6 h-96 overflow-hidden rounded-xl bg-blue-500 bg-clip-border shadow-lg shadow-blue-500/40">
        <Image className="h-full w-full" src={img} alt={name} sizes="384px" />
      </div>
      <CardContent className="py-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">{name}</h2>
        <p>{text}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t py-3">
        <p className="text-sm">{price}$</p>
        <ColorSwatches colors={colors} />
      </CardFooter>
    </Card>
  );

  if (!params.success) return card;

  return (
    <Link
      href={`/products/${params.data.type}/${encodeURIComponent(id)}`}
      aria-label={`View ${name}`}
      onClick={handleSelect}
    >
      {card}
    </Link>
  );
}