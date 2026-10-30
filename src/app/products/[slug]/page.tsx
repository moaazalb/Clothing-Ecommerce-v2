
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { FilteredProducts } from "@/components/products/FilteredProducts";
import { productRouteParamsSchema } from "@/lib/validations/product.schema";

export const metadata: Metadata = {
  title: "Products",
};

interface ProductTypePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductTypePage({
  params,
}: ProductTypePageProps): Promise<ReactElement> {
  const { slug } = await params;

  const result = productRouteParamsSchema.safeParse({
    type: slug,
  });

  if (!result.success) {
    notFound();
  }

  return <FilteredProducts type={result.data.type} />;
}
