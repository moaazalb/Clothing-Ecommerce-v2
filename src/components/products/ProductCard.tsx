
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactElement } from "react";

import { ColorSwatches } from "@/components/products/ColorSwatches";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { Product, ProductId } from "@/lib/validations/product.schema";

interface ProductCardProps {
  id: ProductId;
  name: string;
  text: string;
  img: Product["img"];
  price: number;
  colors?: readonly string[];
}

export function ProductCard({
  id,
  name,
  text,
  img,
  price,
  colors,
}: ProductCardProps): ReactElement {
  const params = useParams<{ slug?: string }>();

  const slug = params?.slug;

  const card = (
    <Card className="w-96 gap-0 py-0">
      <div className="relative mx-4 -mt-6 h-96 overflow-hidden rounded-xl bg-blue-500 bg-clip-border shadow-lg shadow-blue-500/40">
        <Image
          className="h-full w-full"
          src={img}
          alt={name}
          sizes="384px"
        />
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

  if (!slug) {
    return card;
  }

  return (
    <Link
      href={`/products/${encodeURIComponent(slug)}/${encodeURIComponent(String(id))}`}
      aria-label={`View ${name}`}
    >
      {card}
    </Link>
  );
}
