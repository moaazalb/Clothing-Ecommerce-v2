
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { SingleProduct } from "@/components/products/singleProduct/SingleProduct";
import { storeData } from "@/lib/data/dummyData";
import { findProductById } from "@/lib/utils/product/product";
import { productDetailParamsSchema } from "@/lib/validations/product.schema";

export const metadata: Metadata = {
  title: "Product",
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps): Promise<ReactElement> {
  const { slug, id } = await params;

  const result = productDetailParamsSchema.safeParse({
    type: slug,
    id,
  });

  if (!result.success) {
    notFound();
  }

  const product = findProductById(storeData, result.data.id);

  if (!product || product.type !== result.data.type) {
    notFound();
  }

  return <SingleProduct id={result.data.id} />;
}
