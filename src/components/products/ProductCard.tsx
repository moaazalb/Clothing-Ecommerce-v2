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
    <Card className="w-full max-w-sm gap-0 overflow-hidden rounded-xl border border-[#E8D8C3] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4B3621]/10">
      <div className="relative mx-3 mt-3 aspect-square overflow-hidden rounded-lg bg-[#F8F4ED] sm:mx-4 sm:mt-4">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          src={img}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <CardContent className="px-4 py-4 text-center sm:py-5">
        <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-[#4B3621] sm:text-xl">
          {name}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-[#806B56] sm:text-base">
          {text}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-[#E8D8C3] bg-[#F8F4ED]/50 px-4 py-3">
        <p className="text-base font-bold text-[#A87945]">
          {price}$
        </p>

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
      className="block w-full"
    >
      {card}
    </Link>
  );
}
