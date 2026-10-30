import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { FilteredProducts } from "@/components/products/FilteredProducts";
import { productRouteParamsSchema } from "@/lib/validations/product.schema";

interface ProductTypePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductTypePageProps): Promise<Metadata> {
  const { slug } = await params;

  // نحافظ على مخطط التحقق الحالي الذي يستخدم type.
  const result = productRouteParamsSchema.safeParse({
    type: slug,
  });

  return {
    title: result.success ? result.data.type : "Products",
  };
}

export default async function ProductTypePage({
  params,
}: ProductTypePageProps): Promise<ReactElement> {
  const { slug } = await params;

  const result = productRouteParamsSchema.safeParse({
    type: slug,
  });

  if (!result.success) notFound();

  return <FilteredProducts type={result.data.type} />;
}