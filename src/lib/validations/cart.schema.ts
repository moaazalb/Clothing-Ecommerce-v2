// lib/validations/cart.schema.ts
import { z } from "zod";
import { productIdSchema, productImageSchema } from "@/lib/validations/product.schema";

/** Fields that identify one line in the cart: the same product in another size or color is a separate line. */
export const cartItemKeySchema = z.object({
  id: productIdSchema,
  size: z.string().min(1).optional(),
  color: z.string().min(1),
});

/** What a component sends to add a product (the chosen size and color, not the whole lists). */
export const addToCartPayloadSchema = cartItemKeySchema.extend({
  price: z.number().finite().nonnegative(),
  img: productImageSchema,
  name: z.string().min(1),
  text: z.string().min(1),
});

/** A line stored in the cart. */
export const cartItemSchema = addToCartPayloadSchema.extend({
  amount: z.number().int().positive(),
  totalPrice: z.number().finite().nonnegative(),
});

export type CartItemKey = z.infer<typeof cartItemKeySchema>;
export type AddToCartPayload = z.infer<typeof addToCartPayloadSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;