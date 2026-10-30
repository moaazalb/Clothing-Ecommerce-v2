// types/cart.ts
import type { CartItem } from "@/lib/validations/cart.schema";

export interface CartState {
  cart: CartItem[];
  amount: number;
  totalAmount: number;
  totalPrice: number;
}

/** The part of the root state that the cart selectors need. */
export interface CartRootState {
  cart: CartState;
}