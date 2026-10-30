// lib/validations/product.schema.ts
import { z } from "zod";

export const MAX_FILTER_LENGTH = 100;

export const productIdSchema = z.string().min(1);

export const filterValueSchema = z.string().min(1).max(MAX_FILTER_LENGTH);

/** Shape of a statically imported image in Next.js (StaticImageData). */
export const productImageSchema = z.object({
  src: z.string().min(1),
  width: z.number(),
  height: z.number(),
  blurDataURL: z.string().optional(),
  blurWidth: z.number().optional(),
  blurHeight: z.number().optional(),
});

export const productSchema = z.object({
  id: productIdSchema,
  img: productImageSchema,
  name: z.string().min(1),
  text: z.string().min(1),
  type: z.string().min(1),
  gender: z.string().min(1),
  price: z.number().nonnegative(),
  color: z.array(z.string()),
  size: z.array(z.string()).optional(),
});

export const productListSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type ProductId = z.infer<typeof productIdSchema>;

export const PRODUCT_TYPES = [
  "T-Shirts",
  "Hoodies",
  "Shoes",
  "Dresses",
  "Jeans",
  "Jackets",
  "Bags",
  "Suits",
] as const;

export const productTypeSchema = z.enum(PRODUCT_TYPES);

/** The dynamic route segment of `/products/[type]`. */
export const productRouteParamsSchema = z.object({ type: productTypeSchema });

export type ProductType = z.infer<typeof productTypeSchema>;

/** The dynamic route segments of `/products/[type]/[id]`. */
export const productDetailParamsSchema = z.object({
  type: productTypeSchema,
  id: productIdSchema,
});