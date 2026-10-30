// lib/store/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { isSameCartItem, roundPrice } from "@/src/lib/utils/cart/cart";
import {
  addToCartPayloadSchema,
  cartItemKeySchema,
} from "@/lib/validations/cart.schema";
import type { AddToCartPayload, CartItemKey } from "@/lib/validations/cart.schema";
import type { CartState } from "@/types/cart";

/**
 * Builds the initial (empty) cart state.
 *
 * @returns {CartState} An empty cart.
 */
function getInitialState(): CartState {
  return {
    cart: [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
  };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    /**
     * Adds one unit of a product. The same id, size and color increases the amount of the existing line.
     *
     * @param {CartState} state - Current state.
     * @param {PayloadAction<AddToCartPayload>} action - The product with the chosen size and color.
     * @returns {void}
     */
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const result = addToCartPayloadSchema.safeParse(action.payload);
      if (!result.success) return;

      const product = result.data;
      const existing = state.cart.find((item) => isSameCartItem(item, product));
      // The stored price is used for existing lines so totals always match the line.
      const price = existing?.price ?? product.price;

      if (existing) {
        existing.amount += 1;
        existing.totalPrice = roundPrice(existing.totalPrice + price);
      } else {
        state.cart.push({ ...product, amount: 1, totalPrice: product.price });
      }

      state.totalAmount += 1;
      state.totalPrice = roundPrice(state.totalPrice + price);
    },

    /**
     * Removes one unit of a product. The line is deleted when its last unit is removed.
     *
     * @param {CartState} state - Current state.
     * @param {PayloadAction<CartItemKey>} action - The id, size and color of the line.
     * @returns {void}
     */
    removeFromCart(state, action: PayloadAction<CartItemKey>) {
      const result = cartItemKeySchema.safeParse(action.payload);
      if (!result.success) return;

      const existing = state.cart.find((item) => isSameCartItem(item, result.data));
      if (!existing) return;

      if (existing.amount === 1) {
        state.cart = state.cart.filter((item) => !isSameCartItem(item, result.data));
      } else {
        existing.amount -= 1;
        existing.totalPrice = roundPrice(existing.totalPrice - existing.price);
      }

      state.totalAmount -= 1;
      state.totalPrice = roundPrice(state.totalPrice - existing.price);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;