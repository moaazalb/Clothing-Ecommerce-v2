// lib/utils/cart.ts
import type { CartItemKey } from "@/lib/validations/cart.schema";

const CENTS = 100;

/**
 * Rounds a price to 2 decimals so repeated additions do not drift (0.1 + 0.2 = 0.3).
 *
 * @param {number} value - The price to round.
 * @returns {number} The price rounded to cents.
 */
export function roundPrice(value: number): number {
  return Math.round(value * CENTS) / CENTS;
}

/**
 * Checks whether two cart entries are the same line (same id, size and color).
 *
 * @param {CartItemKey} first - The first entry.
 * @param {CartItemKey} second - The second entry.
 * @returns {boolean} True when both entries point to the same cart line.
 */
export function isSameCartItem(first: CartItemKey, second: CartItemKey): boolean {
  return (
    first.id === second.id && first.size === second.size && first.color === second.color
  );
}

/**
 * Builds a stable React key for a cart line from its id, size and color.
 *
 * @param {CartItemKey} item - The cart line (or its key fields).
 * @returns {string} A key that is unique per cart line.
 */
export function getCartItemKey(item: CartItemKey): string {
  return `${item.id}-${item.size ?? "no-size"}-${item.color}`;
}