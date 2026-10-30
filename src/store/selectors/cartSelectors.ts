import type { CartRootState } from "@/types/cart";
import type { CartItem } from "@/lib/validations/cart.schema";

/**
 * Selects the cart lines.
 *
 * @param {CartRootState} state - The root state.
 * @returns {CartItem[]} The lines in the cart.
 */
export function selectCartItems(state: CartRootState): CartItem[] {
  return state.cart.cart;
}

/**
 * Selects the total price of everything in the cart.
 *
 * @param {CartRootState} state - The root state.
 * @returns {number} The total price.
 */
export function selectCartTotalPrice(state: CartRootState): number {
  return state.cart.totalPrice;
}

/**
 * Selects the number of units in the cart (all lines together).
 *
 * @param {CartRootState} state - The root state.
 * @returns {number} The total number of units.
 */
export function selectCartTotalAmount(state: CartRootState): number {
  return state.cart.totalAmount;
}