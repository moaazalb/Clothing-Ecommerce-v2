// lib/validations/productSelection.schema.ts
import { z } from "zod";
import type { Product } from "@/lib/validations/product.schema";

export const SIZE_ERROR_MESSAGE = "Please pick a size from the list.";
export const COLOR_ERROR_MESSAGE = "Please pick a color from the list.";

/**
 * Builds the schema for the size and color a user picks for one product.
 * The size must be one of the product's sizes, or empty for products without sizes (bags).
 *
 * @param {Pick<Product, "size" | "color">} product - The product being shown.
 * @returns {ProductSelectionSchema} The schema for that product (its type is inferred, so form libraries can read it).
 */
export function createProductSelectionSchema(product: Pick<Product, "size" | "color">) {
  const sizes = product.size ?? [];

  return z.object({
    size: z
      .string()
      .refine((value) => (sizes.length === 0 ? value === "" : sizes.includes(value)), SIZE_ERROR_MESSAGE),
    color: z.string().refine((value) => product.color.includes(value), COLOR_ERROR_MESSAGE),
  });
}

export type ProductSelectionSchema = ReturnType<typeof createProductSelectionSchema>;

/** The values of the size and color form: `{ size: string; color: string }`. */
export type ProductSelectionValues = z.infer<ProductSelectionSchema>;